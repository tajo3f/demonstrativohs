# HS Hortigranjeiro Schulz — nova linha processada e higienizada

**Versão 1.0.0-demo** — site responsivo de apresentação, pronto para ser colocado em um repositório GitHub e usado em **preview**. Projeto exclusivo para as embalagens de frutas, legumes e verduras processados e higienizados; **não substitui** o sistema de atacado/varejo já utilizado pelo HS.

## O que está pronto

- Identidade visual HS aplicada com a logomarca fornecida na conversa; design inspirado no mockup em `docs/referencia-visual-mobile.png`.
- Cinco fotos de produto fornecidas: cenoura, abóbora, couve-flor, vinagrete e kit sopão, convertidas para WebP e com dimensões fixas.
- Layout mobile-first, navegação, catálogo, busca normalizada, filtros, ordenação e estados vazios.
- Carrinho persistido apenas no navegador, quantidades, subtotal e barra inferior no celular.
- Formulário com nome, telefone, recebimento, referência e observações; validação e resumo do pedido para **copiar**.
- Responsividade, lazy loading de fotos abaixo da dobra, skeleton no carregamento, estados de feedback, foco visível, teclado e respeito a `prefers-reduced-motion`.
- Modelo de Issue e PR, CI e gate de produção.

**Todos os preços são demonstrativos e não representam valores reais do HS.** As fotos foram fornecidas para criação da demonstração, mas seu uso público definitivo exige confirmação de direitos e aprovação do HS. Peso e disponibilidade continuam a confirmar. A marca foi recortada da arte enviada; solicitar arquivo vetorial oficial para produção.

## Testar localmente

Requer Node.js 20+ para os scripts de qualidade e qualquer servidor HTTP estático para visualizar:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
npm run check
npm test
npm run build
```

O diretório `dist/` contém o pacote estático para preview. Não abra `index.html` via `file://`, pois o navegador bloqueia módulos JavaScript em alguns ambientes.

Teste de navegador em um ambiente com Chromium e Playwright Python:

```bash
python -m pip install playwright
python -m playwright install chromium
npm run test:e2e
```

Em ambientes que bloqueiam acesso local por política do navegador, a suíte E2E deve ser executada no GitHub Actions ou em computador com servidor local habilitado. **Não considerar esse teste aprovado até obter resultado verde real.**

## GitHub e Vercel

1. Crie um repositório **privado** específico para o HS; não use repositórios de outros clientes.
2. Faça upload do conteúdo desta pasta (inclusive `.github`, `AGENTS.md` e `PROJECT_CONTEXT.md`) para uma branch de trabalho e abra PR.
3. `planning/issues.json` tem o backlog; depois de criar o repositório, importe usando `GH_REPO=seu-usuario/seu-repo bash scripts/create-issues.sh` com `gh` autenticado.
4. Vincule o repositório ao Vercel: framework **Other**, comando `node scripts/vercel-build.mjs`, diretório de saída `dist` (o arquivo `vercel.json` já contém essas opções).
5. O preview fica com indexação bloqueada. **O deploy de produção está intencionalmente bloqueado** até os dados e políticas serem aprovados.
6. Configure branch protection na `main`: exigir revisão e checks CI antes de merge. O fluxo de PR está em `.github/PULL_REQUEST_TEMPLATE.md`.

## Antes de habilitar envio de pedidos e publicar

- Confirmar com o HS nomes, peso, preço, estoque, composição, descrição e fotos finais dos itens e atualizar `assets/js/products.js`.
- Confirmar o **número oficial que receberá os pedidos**; o contato pessoal/comercial de Simone não deve ser usado sem autorização específica. Preencher `SITE.whatsapp` com `55` + DDD + número, somente dígitos.
- Confirmar políticas de entrega/retirada, meios de pagamento e atendimento. Alterar cópias e campos conforme operação real.
- Obter logo original em alta resolução/vetor e aprovação da identidade.
- Revisar e aprovar termo/política de privacidade com responsável legal do HS. A página entregue é um **rascunho**, não é válida para produção.
- Depois das aprovações, atualizar as flags em `assets/js/config.js`, `priceStatus:'official'`, pesos oficiais e política revisada. Rodar `npm run check:production`; só então avaliar deploy público.

> A finalização via WhatsApp já está implementada no código, mas o botão fica desabilitado no modo demonstração. O resumo para cópia funciona para fins de apresentação; o site não captura pagamentos nem salva dados pessoais do formulário em banco ou `localStorage`.

## Estrutura

- `index.html` e `politica-de-privacidade.html` — páginas.
- `assets/css/styles.css` — design system e responsividade.
- `assets/js/products.js` — catálogo/preços; `cart.js` — regras testadas; `app.js` — interface; `config.js` — liberações de produção.
- `assets/images` — logomarca de referência e fotos reais otimizadas.
- `tests/` — unitários e smoke de navegador.
- `.github/` — modelos e workflows; `planning/` — backlog; `AGENTS.md` e `PROJECT_CONTEXT.md` — regras de continuidade.

**Desenvolvido por TAJO Digital 3F.**
