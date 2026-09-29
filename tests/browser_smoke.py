"""Responsive, interactions and accessibility-oriented browser smoke for the demo."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
import json

ROOT=Path(__file__).resolve().parents[1]
server=ThreadingHTTPServer(('127.0.0.1',0),partial(SimpleHTTPRequestHandler,directory=str(ROOT)))
url=f'http://127.0.0.1:{server.server_port}/'
Thread(target=server.serve_forever,daemon=True).start()
errors=[]
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium' if Path('/usr/bin/chromium').exists() else None, args=['--no-sandbox'])
    for w in (320,375,390,768,1024,1440):
        page=browser.new_page(viewport={'width':w,'height':800},device_scale_factor=1)
        page.on('pageerror',lambda e:errors.append(str(e)))
        resp=page.goto(url,wait_until='networkidle')
        assert resp.status==200,resp.status
        assert page.locator('.product-card').count()==5,(w,page.locator('.product-card').count())
        assert page.locator('.product-card img').count()==5
        assert not page.evaluate('document.documentElement.scrollWidth > window.innerWidth'),f'horizontal overflow at {w}: {page.evaluate("document.documentElement.scrollWidth - innerWidth")}'
        for im in page.locator('.product-card img').all():
            im.scroll_into_view_if_needed(); im.evaluate('(e)=>e.decode()'); assert im.evaluate('(e)=>e.complete && e.naturalWidth>0'),(w,im.get_attribute('src'))
        page.screenshot(path=str(ROOT/f'preview-{w}.png'),full_page=True)
        print(f'layout {w}px OK')
        if w==390:
            page.locator('#search').fill('cenoura')
            assert page.locator('.product-card').count()==1
            page.locator('#search').fill('')
            page.get_by_role('button',name='Saladas').click()
            assert page.locator('.product-card').count()==1
            page.get_by_role('button',name='Todos').click()
            page.locator('.product-card .add-button').first.click()
            assert page.locator('#cart-count').inner_text()=='1'
            assert not page.locator('#sticky-cart').is_hidden()
            page.get_by_role('button',name='Ver pedido').last.click()
            assert page.locator('#cart-panel').get_attribute('aria-hidden')=='false'
            page.get_by_role('button',name='Aumentar Cenoura picada').click()
            assert '17,80' in page.locator('#cart-subtotal').inner_text()
            page.locator('#checkout').click()
            assert not page.locator('#form-error').is_hidden()
            page.locator('#customer-name').fill('Maria da Silva')
            page.locator('#customer-phone').fill('27999887766')
            page.locator('#privacy-agree').check()
            page.locator('#checkout').click()
            assert page.locator('#preview-dialog').evaluate('(e)=>e.open')
            assert 'Cenoura picada' in page.locator('#preview-message').inner_text()
            assert page.locator('#send-request').is_disabled()
            page.locator('#preview-close').click()
            page.get_by_role('button',name='Ver pedido').last.click()
            page.get_by_role('button',name='Diminuir Cenoura picada').click()
            assert '8,90' in page.locator('#cart-subtotal').inner_text()
            page.keyboard.press('Escape')
            assert page.locator('#cart-panel').get_attribute('aria-hidden')=='true'
            print('interactions 390px OK')
        page.close()
    assert not errors,errors
    browser.close()
server.shutdown()
print('BROWSER SMOKE PASS: six viewport layouts, images, filters, cart, form, summary and demo send gate.')
