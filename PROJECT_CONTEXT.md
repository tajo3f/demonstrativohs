# PROJECT_CONTEXT.md — HS Hortigranjeiro Schulz

> **Leitura obrigatória antes de qualquer mudança, inclusive por agentes de outros modelos.** Última revisão: 2026-09-29. Este arquivo é a fonte operacional do projeto; não é uma autorização para executar ações sem validar requisitos.

## 1. Brief confirmado e limites

- Cliente: HS Hortigranjeiro Schulz, São Luís, Santa Maria de Jetibá — ES. Contato comercial de interlocução: Simone (responsável por Instagram e ofertas).
- Produto deste site: linha exclusiva de **frutas, legumes e verduras processados e higienizados**, incluindo exemplos citados como abóbora, cenoura, vagem, kits de sopa, saladas, frutas e polpas. Validar nomenclaturas finais, pesos, embalagem e fotos.
- O HS **já possui sistema próprio para atacado e varejo**. Não criar fluxos de atacado/varejo nem prometer substituir/integrar o sistema atual sem aprovação de escopo.
- Escopo MVP acordado em proposta comercial preliminar: vitrine responsiva, categorias, seleção/carrinho, resumo e caminho de pedido a confirmar com HS. Sem banco de dados, checkout financeiro ou painel administrativo neste MVP. A versão 1.0.0-demo possui UI completa, carrinho, busca, filtros, ordenação, formulário, resumo e cópia. O envio WhatsApp está funcional no código mas bloqueado por gate de produção.
- Data comunicada para lançamento da linha: 18/10. Confirmar ano, disponibilidade e cronograma com HS antes de publicar.
- Valores usados (R$ 8,90; 9,90; 10,90; 7,90; 14,90) são SOMENTE DEMONSTRATIVOS. Peso, estoque, identidade em vetor, número de WhatsApp oficial de pedidos, entrega/retirada, políticas e domínio NÃO foram confirmados. Não ativar checkout com número da Simone ou da TAJO.
- Fotos de cenoura, abóbora, couve-flor, vinagrete e kit sopão foram fornecidas em conversa e convertidas para WebP no MVP. A logo foi recortada da imagem de referência do HS; solicitar o vetor final. Todas dependem de aceite para produção.

## 2. Rotina obrigatória de desenvolvimento

1. Ler este arquivo, `AGENTS.md`, `README.md` e componentes atuais antes de criar/recriar código.
2. Cada mudança começa em Issue GitHub, classificada como `Correção`, `Melhoria` ou `Nova função`; descrever objetivo, aceite, dependências, validação e risco.
3. Criar branch `fix/<issue>-...`, `improve/<issue>-...` ou `feat/<issue>-...` a partir de `main`. Evitar commits diretos em `main`.
4. PR obrigatório contendo `Refs #N` (ou `Closes #N` só quando a mudança encerrar integralmente a Issue), mudanças, validação com comandos/resultados, riscos, limitações, próximos passos, screenshots/responsividade quando UI, rollback/deploy.
5. CI: checagem sintática, testes unitários e build; e2e/visual/manual conforme risco. Exigir revisão e checks verdes em branch protection. Não declarar validado sem ter executado.
6. Alterações em dados comerciais precisam de aprovação da Simone/responsável HS; conteúdo legal revisado pelo jurídico competente; manter evidência de aceite.
7. Deploy em preview por PR quando habilitado. Produção somente via aprovação explícita, `check:production` verde e segredos configurados. Nenhum agente deve driblar o gate para publicar.

## 3. Diretriz de produto e motion

- Público-alvo: cliente final da nova linha; leitura fácil em celular e navegação simples. Referências: `kylezantos/design-motion-principles` e `emilkowalski/skills` (`animate`, `review-animations`, `mobile-native`).
- Instalar no ambiente com rede: `npx skills add kylezantos/design-motion-principles` e `npx skills@latest add emilkowalski/skills`.
- Priorizar polimento de produção: feedback perceptível, curva consistente, transições de 160–280ms para ações usuais; manter animações frequentes discretas. Sem scroll-jacking, pulso decorativo infinito, transição `all`, overshoot desnecessário ou hover-scale em tudo.
- Todo motion respeita `prefers-reduced-motion`. Entradas/saídas para elementos condicionais relevantes, sem esconder conteúdo de leitores de tela. Evitar custo excessivo de layout, preferir `transform`/`opacity`.
- Loading/skeleton só quando houver espera real ou inicialização assíncrona; lazy-load apenas fotos abaixo da dobra. Botões com estado de progresso quando uma operação demora; respostas instantâneas sem spinner artificial. Mostrar feedback de ação, erro e vazio.
- Validar 320, 375, 390, 768, 1024 e 1440 px; checar toque, texto, contraste, foco, navegação por teclado e leitura sem animação.

## 4. Arquitetura e qualidade

- Frontend estático, componentização criteriosa via módulos `products.js`, `cart.js`, `config.js`, `app.js` e CSS; não introduzir backend só para demonstrar.
- DRY onde houver duplicação real; não criar abstrações prematuras. Reusar componentes antes de reconstruir.
- Privacidade: manter carrinho local. Não persistir nome/observações do cliente; sem analytics, pixel, Sentry ou telemetria pessoal sem base legal e consentimento/documentação adequados.
- Sem rate limit em backend inexistente. Se backend/integração surgir: abrir Issue de arquitetura para autenticação, autorização, rate limit, segurança, observabilidade e privacidade. Não adicionar Sentry/Datadog/New Relic/OpenTelemetry sem necessidade operacional comprovada.
- Preservar performance: sem libs pesadas runtime, JPEG de referência contido e fontes com fallback. Monitorar impacto de imagem, layout shift e JS.
- Antes de merge: checklist de segurança (dados/configuração), acessibilidade, testes, inspeção visual de designer sênior e performance.
- Políticas de privacidade e termos: revisão/aprovação jurídica do HS antes de publicar. O rascunho NÃO é texto legal final.

## 5. Entrega e artefatos

- `planning/issues.json` possui backlog importável. `.github/PULL_REQUEST_TEMPLATE.md` fixa o contrato de PR.
- CI: `.github/workflows/ci.yml`; deploy manual: `.github/workflows/deploy.yml`, condicionado ao gate e segredos.
- Cada alteração deste documento exige Issue/PR e revisão de continuidade para próximos agentes.

## 6. Mudanças na versão 1.0.0-demo (29/09/2026)

- Interface visual baseada no mockup `docs/referencia-visual-mobile.png`, nas cores e identidade HS.
- Produtos reais fotografados pelo cliente: cenoura, abóbora, couve-flor, vinagrete e kit sopão. Preços inventados somente para a simulação e rotulados como demonstrativos.
- Novos módulos mantidos: `products.js`, `cart.js`, `config.js`, `app.js`; `index.html` reestruturado e CSS revisado.
- Busca, filtros, ordenação, carrinho, subtotal, dados do cliente, preview, cópia do texto e gate de envio.
- Sem autorização para produção. A publicação do preview para pessoas externas precisa sinalizar explicitamente que é demonstrativo.
- Se houver alteração de produto/preço/contato, documentar na Issue e PR e obter validação de quem decide no HS.
