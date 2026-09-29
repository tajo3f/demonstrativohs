import {execFileSync} from 'node:child_process';
import {readdirSync,readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {products} from '../assets/js/products.js';
const files=[];const scan=p=>{for(const e of readdirSync(p,{withFileTypes:true})){const f=join(p,e.name);if(e.isDirectory())scan(f);else if(/\.m?js$/.test(e.name))files.push(f)}};scan('assets/js');scan('scripts');scan('tests');
for(const f of files)execFileSync(process.execPath,['--check',f],{stdio:'pipe'});
const html=readFileSync('index.html','utf8');for(const ref of ['./assets/css/styles.css','./assets/js/app.js','./assets/images/hs-simbolo.webp','./politica-de-privacidade.html'])if(!html.includes(ref))throw Error(`Missing asset reference: ${ref}`);
for(const p of products){if(!existsSync(p.image.replace('./','')))throw Error(`Missing product image: ${p.image}`);if(!(p.price>0))throw Error(`Invalid demonstration price: ${p.id}`)}
if(!html.includes('VALORES DEMONSTRATIVOS')||!html.includes('Valores demonstrativos'))throw Error('Demo label required.');
console.log(`Static checks OK: ${files.length} scripts; ${products.length} products and images available.`);
