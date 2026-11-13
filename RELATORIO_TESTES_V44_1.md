# Relatório de validação V44.1 — 13/11/2026

- Validação Node de sintaxe de `assets/js/app.js`, `sw.js` e versões `dist/`.
- Verificação de 20 preços V44 (padrão e industrial) preservados; 41 produtos catalogados.
- Revisão da regra de desconto PJ/CNPJ mantida.
- Verificação de paridade entre fonte raiz e `dist/`.
- Correção de versão `engines.node` e do comportamento do Service Worker.
- Diagnóstico de recursos não incluídos no ZIP parcial via `npm run verify:assets`.
- A validação visual no navegador e a publicação na Vercel dependem dos demais arquivos originais do repositório.

**Este relatório não comprova a produção publicada nem o funcionamento do CSS/imagens ausentes deste patch.**
