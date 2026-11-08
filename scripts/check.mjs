import {execFileSync} from 'node:child_process';
import {readdirSync,readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {products} from '../assets/js/products.js';
const files=[];
const scan=p=>{for(const e of readdirSync(p,{withFileTypes:true})){const f=join(p,e.name);if(e.isDirectory())scan(f);else if(/\.m?js$/.test(e.name))files.push(f)}};
scan('assets/js');scan('scripts');scan('tests');
for(const f of files) execFileSync(process.execPath,['--check',f],{stdio:'pipe'});
const html=readFileSync('index.html','utf8');
for(const ref of ['./assets/css/app.css?v=35','./assets/js/app.js?v=35','./assets/images/hero-hs-v33-1672.webp','./manifest.webmanifest']) {
  if(!html.includes(ref))throw Error(`HTML sem referência obrigatória: ${ref}`);
}
for(const file of ['sw.js','manifest.webmanifest','privacidade.html','termos.html','politica-de-privacidade.html']) {
  if(!existsSync(file))throw Error(`Arquivo obrigatório ausente: ${file}`);
}
for(const p of products){if(!existsSync(p.image.replace('./','')))throw Error(`Imagem de produto ausente: ${p.image}`);if(!(p.price>0))throw Error(`Preço inválido: ${p.id}`)}
console.log(`Verificação estática OK: ${files.length} scripts, ${products.length} produtos, imagens e PWA presentes.`);
