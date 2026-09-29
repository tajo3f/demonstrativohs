import { rmSync,mkdirSync,cpSync,copyFileSync,writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
execFileSync(process.execPath,['scripts/check.mjs'],{stdio:'inherit'});
rmSync('dist',{recursive:true,force:true});mkdirSync('dist',{recursive:true});
copyFileSync('index.html','dist/index.html');copyFileSync('politica-de-privacidade.html','dist/politica-de-privacidade.html');cpSync('assets','dist/assets',{recursive:true});writeFileSync('dist/robots.txt', process.env.VERCEL_ENV === 'production' ? 'User-agent: *\nAllow: /\n' : 'User-agent: *\nDisallow: /\n');
console.log('Demo build OK in dist/ (indexing blocked until launch approval).');
