import { rmSync,mkdirSync,cpSync,copyFileSync,writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
execFileSync(process.execPath,['scripts/check.mjs'],{stdio:'inherit'});
rmSync('dist',{recursive:true,force:true});
mkdirSync('dist',{recursive:true});
for(const filename of ['index.html','privacidade.html','termos.html','politica-de-privacidade.html','404.html','manifest.webmanifest','sw.js','ATUALIZACAO_V37.txt','ATUALIZACAO_V38.txt','ATUALIZACAO_V39.txt']) {
 copyFileSync(filename,`dist/${filename}`);
}
cpSync('assets','dist/assets',{recursive:true});
writeFileSync('dist/robots.txt', process.env.VERCEL_ENV === 'production' ? 'User-agent: *\nAllow: /\n' : 'User-agent: *\nDisallow: /\n');
console.log('HS V39: pasta dist/ atualizada com todas as imagens, PWA e arquivos do site.');
