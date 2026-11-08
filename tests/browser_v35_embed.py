"""Teste de integração sem HTTP local; Chromium restringe localhost neste ambiente."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import re
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text()
html=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]*>', '',html)
html=html.replace('<head>','<head><base href="https://hortigranjeiroschulz.com.br/">')
html=re.sub(r'<script src="./assets/js/app.js\?v=35" defer></script>','',html)
css=(ROOT/'assets/css/app.css').read_text()
js=(ROOT/'assets/js/app.js').read_text()
errors=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width in [375, 1440]:
  page=browser.new_page(viewport={'width':width,'height':930},device_scale_factor=1)
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(html, wait_until='domcontentloaded')
  page.add_style_tag(content=css)
  page.evaluate("""() => {const RealDate=Date;window.Date=class extends RealDate{constructor(...a){super(...(a.length?a:['2026-11-09T13:00:00.000Z']))}}}""")
  page.add_script_tag(content=js)
  assert page.locator('#catalog-grid .catalog-card').count() == 41, f'{width} produtos'
  assert not page.evaluate('document.documentElement.scrollWidth > window.innerWidth+1'),f'{width} overflow'
  page.locator('.bottom-nav [data-route="products"]').click()
  page.locator('#catalog-search').fill('Abóbora japonesa em fatias')
  assert page.locator('#catalog-grid .catalog-card').count() >= 1
  page.locator('#catalog-grid .catalog-card').first.locator('.catalog-image').click()
  assert page.locator('#product-dialog').is_visible()
  page.locator('input[name="detail-package"][value="industrial"]').check(force=True)
  assert '44,12' in page.locator('[data-detail-price]').inner_text(), page.locator('[data-detail-price]').inner_text()
  page.locator('input[name="detail-package"][value="varejo"]').check(force=True)
  for x in range(9):page.locator('[data-plus]').click()
  assert '5,99' in page.locator('[data-detail-price]').inner_text()
  page.locator('.detail-add').click()
  page.locator('.bottom-nav [data-route="cart"]').click()
  assert '59,90' in page.locator('#summary-total').inner_text(),page.locator('#summary-total').inner_text()
  assert not page.locator('#open-checkout').is_disabled()
  page.locator('#open-checkout').click()
  page.locator('#customer-type').select_option('pj')
  assert '59,90' in page.locator('#summary-total').inner_text() # no CNPJ, no discount
  page.locator('#customer-cnpj').fill('11222333000181')
  assert '50,91' in page.locator('#summary-total').inner_text(),page.locator('#summary-total').inner_text()
  assert '15%' in page.locator('#checkout-preview').inner_text()
  page.locator('#customer-type').select_option('pf')
  assert '59,90' in page.locator('#summary-total').inner_text()
  page.locator('#close-checkout').click()
  page.locator('.bottom-nav [data-route="products"]').click()
  page.locator('#catalog-search').fill('Abóbora japonesa em fatias')
  page.locator('#catalog-grid .catalog-card').first.locator('.catalog-image').click()
  page.locator('input[name="detail-package"][value="industrial"]').check(force=True)
  assert '44,12' in page.locator('[data-detail-price]').inner_text()
  page.locator('.detail-add').click() # changes this product to one industrial package, keeping qty=10 -> 10 industrial
  page.locator('.bottom-nav [data-route="cart"]').click()
  assert '441,20' in page.locator('#summary-total').inner_text(), page.locator('#summary-total').inner_text()
  page.locator('#open-checkout').click()
  page.locator('#customer-type').select_option('pj')
  page.locator('#customer-cnpj').fill('11222333000181')
  assert '375,00' in page.locator('#summary-total').inner_text(),page.locator('#summary-total').inner_text()
  page.locator('#close-checkout').click()
  page.locator('.bottom-nav [data-route="more"]').click()
  page.locator('#share-more').click()
  assert page.locator('#share-dialog').is_visible()
  assert 'Conheça o aplicativo de pedidos' in page.locator('#share-message').input_value()
  assert 'https://hortigranjeiroschulz.com.br/' in page.locator('#share-message').input_value()
  page.locator('#share-close').click()
  assert not page.locator('#share-dialog').is_visible()
  print('OK viewport',width,'catálogo, regras PF/PJ, atacado 10 unidades, 5 kg, compartilhamento')
  page.close()
 browser.close()
assert not errors,errors
