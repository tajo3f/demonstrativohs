"""Teste real (Chromium): preços exatos de 20 produtos na V44, em celular e desktop."""
import json,re
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from functools import partial
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
source=(ROOT/'assets/js/app.js').read_text()
items=json.loads(re.search(r'const PRODUCTS = (\[[\s\S]*?\]);\s*const FRUIT_OPTIONS',source).group(1))
targets={
'abobora-japonesa-sem-casca-cubos-500g':(7.99,69.69),'aipim-cortado-congelado-500g':(3.99,34.62),
'batata-inglesa-canoa-500g':(6.90,55.89),'chuchu-paysanne-500g':(3.99,20.24),
'batata-doce-rosada-rodelas-500g':(6.49,60.49),'combinado-cenoura-vagem-cubos-500g':(9.35,86.25),
'kit-primavera-01-500g':(13.60,128.80),'beterraba-cubos-pequenos-500g':(6.99,60.49),
'vagem-verde-bastonetes-500g':(12.99,125.66),'kit-refogado-500g':(10.49,89.10),
'kit-primavera-02-500g':(13.60,128.80),'kit-buque-couve-brocolis-500g':(9.99,92.00),
'inhame-chines-cubos-500g':(8.99,83.49),'kit-maionese-1kg':(8.99,80.50),
'kit-yakisoba-500g':(12.99,106.60),'inhame-cara-500g':(8.99,83.49),
'seleta-de-legumes-500g':(8.90,82.25),'espaguete-abobrinha-cenoura-500g':(7.99,63.25),
'quiabo-fatiado-500g':(10.49,98.82),'kit-sopa-500g':(8.10,74.17)
}
fmt=lambda v:f'R$ {v:,.2f}'.replace(',','X').replace('.',',').replace('X','.')
server=ThreadingHTTPServer(('127.0.0.1',0),partial(SimpleHTTPRequestHandler,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
errors=[]
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  for width in (390,1280):
   page=browser.new_page(viewport={'width':width,'height':1000})
   page.on('pageerror',lambda e:errors.append(str(e)))
   resp=page.goto(f'http://127.0.0.1:{server.server_port}/',wait_until='domcontentloaded')
   assert resp and resp.status==200
   page.locator('[data-route="products"]').first.click()
   assert page.locator('#catalog-search').is_visible()
   for id,(regular,bulk) in targets.items():
    item=next(product for product in items if product['id']==id)
    page.locator('#catalog-search').fill(item['name'])
    grid=page.locator('#catalog-grid .catalog-card')
    assert grid.count()==1,(id,'busca deve dar um produto',grid.count())
    grid.locator('h3').click()
    assert page.locator('[data-detail-price]').is_visible(),id
    assert page.locator('[data-detail-price]').inner_text()==fmt(regular),(id,'500g',page.locator('[data-detail-price]').inner_text(),fmt(regular))
    assert page.locator('.package-option:has(input[value="industrial"]) b').inner_text()==fmt(bulk),(id,'preço industrial exibido')
    page.locator('input[name="detail-package"][value="industrial"]').check()
    assert page.locator('[data-detail-price]').inner_text()==fmt(bulk),(id,'5kg',page.locator('[data-detail-price]').inner_text(),fmt(bulk))
    assert page.locator('[data-detail-weight]').inner_text()=='5 kg',(id,'peso')
    page.locator('.detail-close').click()
   assert not page.evaluate('document.documentElement.scrollWidth > innerWidth'),f'overflow horizontal {width}'
   page.close()
  assert not errors,errors
  browser.close()
finally:
 server.shutdown()
print('PASS V44: 20 produtos x 2 embalagens x 2 viewports = 80 verificações visuais de preço; sem erros JS.')
