# Relatório de testes — V44

**Teste de código (Node):** `npm run check` — 7 testes passaram, sem erros.

**Conferência de dados:** 20 produtos; `price` principal e embalagem padrão iguais à foto; industrial de 5 kg igual à foto. Nenhum preço industrial foi multiplicado ou recalculado para gerar preço público.

**Regra de CNPJ:** sem PJ + CNPJ, exibe o preço exato; com PJ + CNPJ, aplica 15% de desconto sobre o preço público informado. Mantidas as demais regras do checkout.

**Sincronização:** `index.html`, `sw.js`, `assets/js/app.js` idênticos aos respectivos arquivos em `dist/`.

**Teste no navegador real:** não pôde ser realizado neste ambiente porque o Chromium bloqueou acesso local (`ERR_BLOCKED_BY_ADMINISTRATOR`). Teste reproduzível disponível em `tests/browser_prices_v44.py`. É recomendável conferir no celular e no computador antes de publicar em produção.
