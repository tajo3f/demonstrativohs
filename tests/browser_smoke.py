"""Smoke test de navegador para ambiente local com Playwright/Chromium."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from functools import partial
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
server=ThreadingHTTPServer(('127.0.0.1',0),partial(SimpleHTTPRequestHandler,directory=str(ROOT)))
url=f'http://127.0.0.1:{server.server_port}/'
Thread(target=server.serve_forever,daemon=True).start()
errors=[]
try:
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True, args=['--no-sandbox'])
        for w in (320,375,390,768,1024,1440):
            page=browser.new_page(viewport={'width':w,'height':900},device_scale_factor=1)
            page.on('pageerror',lambda e:errors.append(str(e)))
            response=page.goto(url,wait_until='networkidle')
            assert response and response.status==200,(w,response.status if response else None)
            assert not page.evaluate('document.documentElement.scrollWidth > window.innerWidth'), f'overflow horizontal {w}'
            page.locator('[data-route="products"]').first.click()
            page.wait_for_timeout(100)
            assert page.locator('#catalog-grid .catalog-card').count()==40
            for im in page.locator('#catalog-grid .catalog-card img').all():
                im.scroll_into_view_if_needed(); im.evaluate('(e)=>e.decode()')
                assert im.evaluate('(e)=>e.complete && e.naturalWidth>0'), im.get_attribute('src')
            if w==390:
                page.locator('#catalog-search').fill('Salada de frutas')
                page.locator('#catalog-grid .catalog-card').click()
                fruits=page.locator('[data-fruit-option]')
                assert fruits.count()==9
                fruits.nth(0).check(); fruits.nth(1).check(); fruits.nth(2).check()
                assert page.locator('[data-fruit-counter]').inner_text().startswith('3/3')
                assert fruits.nth(3).is_disabled()
                page.locator('[data-addon-option]').first.check()
                assert '15,98' in page.locator('[data-detail-price]').inner_text()
                page.locator('.detail-add').click()
                page.locator('#catalog-search').fill('Seleta de legumes')
                page.locator('#catalog-grid .catalog-card').click()
                page.locator('input[name="detail-option"][value="com-milho"]').check()
                assert '11,48' in page.locator('[data-detail-price]').inner_text()
                page.locator('.detail-add').click()
                page.locator('[data-route="cart"]').first.click()
                page.locator('#open-checkout').click()
                page.select_option('#customer-delivery','Entrega')
                assert page.locator('#delivery-address-field').is_visible()
                page.fill('#customer-address','Rua Teste, 123 - Centro')
                page.evaluate("window.__wa=''; window.open=(u)=>{window.__wa=u; return {closed:false}}")
                page.locator('#finalize-order').click()
                wa=page.evaluate('window.__wa')
                assert wa.startswith('https://wa.me/5527999087648?text='),wa
            page.close()
        assert not errors,errors
        browser.close()
finally:
    server.shutdown()
print('BROWSER SMOKE PASS')
