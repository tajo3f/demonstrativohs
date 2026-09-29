# Instruções obrigatórias para agentes de código

Leia `PROJECT_CONTEXT.md` e `README.md` integralmente ANTES de alterar qualquer arquivo. Estas regras se aplicam a todo agente e modelo.

- Cada tarefa deve ter Issue `Correção`, `Melhoria` ou `Nova função`. Trabalhar em branch; nunca editar `main` diretamente; apresentar por PR com Issue, mudanças, validação real, riscos e próximos passos.
- Reutilizar módulos e elementos existentes. O escopo é o catálogo exclusivo HS para a linha processada e higienizada; não reconstruir sistema de atacado/varejo, não adicionar backend ou painel sem aprovação.
- Não liberar envio por WhatsApp antes de ter número de **pedidos** confirmado, preços/pesos/fotos aprovados e política aprovada. Não inferir o canal de pedidos a partir do número da Simone.
- Não publicar valores demonstrativos como valores reais; conteúdo comercial e alegações dependem de aprovação escrita do HS.
- Testar com `npm run check`, `npm test`, `npm run build` e `npm run test:e2e` em ambiente com Chromium permitido. O gate `npm run check:production` deve falhar enquanto houver pendências.
- Motion conforme `planning/MOTION_GUIDELINES.md`, `prefers-reduced-motion`, sem animações bruscas. CSS e JS devem dar feedback/estados vazios e loading real. Imagens abaixo da dobra lazy.
- Não incluir segredos, analytics, telemetria, cookies de marketing ou coletar dados pessoais sem base legal e escopo aprovado.
- Evitar overengineering e não criar abstrações prematuras. Separar dados comerciais, estado do carrinho e UI. Não aprovar PR só por aparência: validar responsividade, acessibilidade, segurança e performance.
