# Relatório de testes — versão final oficial

Data: 22/10/2026

## Testes executados e aprovados
- `node --check assets/js/app.js`: JavaScript sem erro de sintaxe.
- `npm test`: **8/8 testes aprovados**.
- 40 produtos encontrados no catálogo.
- 40 imagens principais de produtos existentes e sem duplicidade.
- Todas as imagens principais abertas/validadas com sucesso.
- 40 preços numéricos válidos e maiores que zero.
- Abóbora japonesa sem casca em cubos: R$ 5,99 / 500 g.
- Espaguete de abobrinha e cenoura: R$ 7,99 / 500 g.
- Salada de frutas: R$ 12,49 / 250 g, 9 frutas disponíveis, limite de 3 seleções e 4 opcionais.
- Seleta: R$ 7,99 / 500 g e adicional de milho de R$ 3,49 / 80 g.
- WhatsApp oficial: 5527999087648.
- IDs do HTML sem duplicidade.
- Referências locais do HTML e do Service Worker verificadas.
- Cache do PWA atualizado para `hs-final-2026-10-22-v1`.

## Teste de navegador
O arquivo `tests/browser_smoke.py` foi atualizado para validar seis larguras de tela, imagens, personalizações, carrinho, endereço de entrega e URL do WhatsApp. O Chromium do ambiente de geração bloqueia navegação local por política administrativa (`ERR_BLOCKED_BY_ADMINISTRATOR`), portanto esse smoke test precisa ser executado em um ambiente normal de desenvolvimento/CI com navegador liberado.

## Resultado
A verificação estática, de dados, imagens, PWA e sintaxe foi concluída sem falhas conhecidas.
