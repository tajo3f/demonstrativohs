import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const html = readFileSync(join(root, 'index.html'), 'utf8');
const app = readFileSync(join(root, 'assets/js/app.js'), 'utf8');
const required = new Set([
  'index.html', 'assets/js/app.js', 'sw.js', 'manifest.webmanifest',
  'assets/css/app.css', 'privacidade.html', 'termos.html'
]);
// Captura referências reais de imagens no HTML e no catálogo JavaScript.
for (const match of (html + '\n' + app).matchAll(/assets\/images\/[a-zA-Z0-9._-]+\.(?:png|jpg|jpeg|webp|ico)/g)) {
  required.add(match[0]);
}
const missing = [...required].filter(path => !existsSync(join(root, path)));
if (missing.length) {
  console.error(`FALTAM ${missing.length} arquivos obrigatórios. O ZIP V44 era apenas uma atualização; mantenha os arquivos originais do GitHub:`);
  for (const path of missing) console.error(` - ${path}`);
  process.exitCode = 1;
} else {
  console.log(`OK: ${required.size} arquivos essenciais disponíveis no repositório completo.`);
}
