# Status verificado — versão 1.0.0-demo, 29/09/2026

## Implementado

- Identidade visual HS com logomarca recortada da arte fornecida (substituir por vetor original antes de lançar).
- Cinco fotos dos produtos fornecidas pelo usuário, convertidas a WebP: cenoura, abóbora, couve-flor, vinagrete, kit sopão. Valores apenas demonstrativos.
- Home responsiva inspirada no mockup, filtros, busca, ordenação, cartões, carrinho, quantidades, subtotal, formulário, resumo e cópia.
- Envio por WhatsApp implementado, mas bloqueado por gate de produção até aprovação do número oficial de pedidos, catálogo, marca e política.
- Responsividade via CSS para 320/375/390/768/1024/1440px, lazy-load de imagens abaixo da dobra, skeleton e animações com reduced-motion.
- `.github` com CI, templates e deploy manual protegido; `AGENTS.md` e `PROJECT_CONTEXT.md` fixam os critérios de Issues/PR.

## Verificações executadas

- `npm run check`: aprovado (sintaxe de 10 scripts, arquivos e 5 imagens).
- `npm test`: **11 testes aprovados**, incluindo carrinho, preços, validações, metadados, assets e breakpoints.
- `npm run build`: aprovado; gerou `dist/` com `robots.txt` bloqueando indexação.
- `npm run check:production`: **bloqueio intencional confirmado** (ausência de aprovações, número oficial e pesos/preços oficiais).
- `npm run test:e2e`: **não pôde executar neste ambiente** porque a política do Chromium bloqueou `http://127.0.0.1` (`ERR_BLOCKED_BY_ADMINISTRATOR`). Não declarar aprovado. A suíte foi incluída no CI para execução no GitHub Actions após importação do repositório.

## GitHub remoto

Não foi encontrado repositório próprio para o HS na conta conectada. Não foram criadas Issues ou PRs remotos, não houve merge nem deploy; preservar a separação do projeto `schpedidos`. Backlog importável em `planning/issues.json`.

## Antes de produção

Confirmação escrita dos preços reais, pesos, catálogo completo, fotos e logo oficiais, número de **pedidos** (não presumir o contato da Simone), frete/entrega/retirada, meios de pagamento, domínio e política revisada/aprovada pelo responsável legal. Fechar Issues/PRs e validar a experiência no navegador de verdade antes do merge.
