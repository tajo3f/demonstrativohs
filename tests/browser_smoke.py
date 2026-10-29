"""Smoke test da V30 em Chromium real."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from functools import partial
from urllib.parse import unquote
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
server=ThreadingHTTPServer(('127.0.0.1',0),partial(SimpleHTTPRequestHandler,directory=str(ROOT)))
url=f'http://127.0.0.1:{server.server_port}/'
Thread(target=server.serve_forever,daemon=True).start()
errors=[]
try:
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
        for w in (320,375,390,768,1024,1440):
            page=browser.new_page(viewport={'width':w,'height':1000},device_scale_factor=1)
            page.on('pageerror',lambda e:errors.append(str(e)))
            response=page.goto(url,wait_until='networkidle')
            assert response and response.status==200,(w,response.status if response else None)
            assert page.locator('.bottom-nav').is_visible(), f'navegacao inferior ausente em {w}'
            assert not page.locator('.desktop-sidebar').is_visible(), f'sidebar desktop visivel em {w}'
            assert not page.locator('.desktop-cart').is_visible(), f'carrinho lateral desktop visivel em {w}'
            assert not page.evaluate('document.documentElement.scrollWidth > window.innerWidth'), f'overflow horizontal {w}'
            assert page.locator('.implementation-card').is_visible()
            page.locator('[data-route="products"]').first.click()
            page.wait_for_timeout(120)
            assert page.locator('#catalog-grid .catalog-card').count()==40
            for im in page.locator('#catalog-grid .catalog-card img').all():
                im.scroll_into_view_if_needed(); im.evaluate('(e)=>e.decode()')
                assert im.evaluate('(e)=>e.complete && e.naturalWidth>0'), im.get_attribute('src')

            if w==390:
                # Salada de frutas questionário + opcional.
                page.locator('#catalog-search').fill('Salada de frutas')
                page.locator('#catalog-grid .catalog-card').click()
                fruits=page.locator('[data-fruit-option]')
                assert fruits.count()==9
                fruits.nth(0).check(); fruits.nth(1).check(); fruits.nth(2).check()
                assert page.locator('[data-fruit-counter]').inner_text().startswith('3/3')
                assert fruits.nth(3).is_disabled()
                page.locator('[data-addon-option]').first.check()
                assert '13,48' in page.locator('[data-detail-price]').inner_text()
                page.locator('.detail-add').click()

                # Seleta + milho; preço base atualizado para R$ 8,90.
                page.locator('#catalog-search').fill('Seleta de legumes')
                page.locator('#catalog-grid .catalog-card').click()
                page.locator('input[name="detail-package"][value="varejo"]').check()
                page.locator('input[name="detail-option"][value="com-milho"]').check()
                assert '12,39' in page.locator('[data-detail-price]').inner_text()
                page.locator('.detail-add').click()

                # Embalagem industrial exige PJ/CNPJ.
                page.locator('#catalog-search').fill('Mix de forno')
                page.locator('#catalog-grid .catalog-card').click()
                page.locator('input[name="detail-package"][value="industrial"]').check()
                assert '109,20' in page.locator('[data-detail-price]').inner_text()
                assert '5 kg' in page.locator('[data-detail-weight]').inner_text()
                page.locator('.detail-add').click()

                page.locator('[data-route="cart"]').first.click()
                page.locator('#open-checkout').click()
                page.select_option('#customer-type','pj')
                page.fill('#customer-cnpj','12345678000199')
                page.select_option('#customer-delivery','Entrega')
                assert page.locator('#delivery-address-field').is_visible()
                assert 'R$ 10,00' in page.locator('#delivery-rules').inner_text()
                page.fill('#customer-address','Rua Teste, 123 - Centro')
                page.select_option('#customer-payment','Dinheiro')
                assert page.locator('#cash-change-field').is_visible()
                page.fill('#customer-cash-given','200,00')
                assert 'Troco calculado' in page.locator('#cash-change-result').inner_text()
                page.fill('#customer-name','Joao Paulo')
                page.fill('#customer-phone','27999999999')
                page.fill('#customer-notes','Retirar cebola e entregar no portão lateral')
                page.evaluate("window.__wa=''; window.open=(u)=>{window.__wa=u; return {closed:false}}")
                page.locator('#finalize-order').click()
                wa=page.evaluate('window.__wa')
                assert wa.startswith('https://wa.me/5527999087648?text='),wa
                message=unquote(wa.split('?text=',1)[1])
                assert message.startswith('🚨 *NOVO PEDIDO • HS HORTIGRANJEIRO*')
                assert '*CNPJ*' in message
                assert '*TAXA DE ENTREGA:* R$ 10,00' in message
                assert 'Embalagem industrial • 5 kg' in message
                assert '*FORMA DE PAGAMENTO*\nDinheiro' in message
                assert '*TROCO PARA*\nR$ 200,00' in message
                for forbidden in ('👤','📱','📍','💳','📝','🟢'):
                    assert forbidden not in message
            page.close()
        assert not errors,errors
        browser.close()
finally:
    server.shutdown()
print('BROWSER SMOKE PASS V30')
