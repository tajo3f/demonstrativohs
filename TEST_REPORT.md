# Relatório de validação — V27

Data: 26/10/2026

## Validações concluídas
- `node --check assets/js/app.js`: aprovado.
- `node --test tests/app.test.mjs`: 8/8 testes aprovados.
- Verificação de 40 imagens de produtos locais: aprovado, sem arquivos ausentes.
- Verificação dos ícones PWA/favicons e identidade visual: aprovado.
- Verificação via servidor HTTP local com `curl`: index, JavaScript e logomarca retornaram HTTP 200.
- Varredura de URLs externas: somente o endpoint público `wa.me` usado para envio do pedido.
- Validação das regras de entrega, retirada, CNPJ, atacado e embalagens industriais no código: aprovado.

## Observação sobre teste visual automatizado
O smoke test com Chromium/Playwright está incluído no repositório, porém o navegador headless deste ambiente bloqueou navegação local por política administrativa (`ERR_BLOCKED_BY_ADMINISTRATOR`). Por isso, não foi registrado como teste visual executado neste ambiente.

Antes da publicação definitiva, recomenda-se abrir a V27 em um celular real e em um desktop apenas para a conferência visual final de produção.
