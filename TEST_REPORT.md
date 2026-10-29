# Relatório de validação — V30

Data: 28/10/2026

## Validações concluídas
- `node --check assets/js/app.js`: aprovado.
- `node --test tests/app.test.mjs`: 11/11 testes aprovados.
- Verificação de 40 imagens de produtos locais: aprovado, sem arquivos ausentes.
- Verificação dos ícones PWA/favicons e identidade visual: aprovado.
- Verificação via servidor HTTP local com `curl`: index, JavaScript e logomarca retornaram HTTP 200.
- Varredura de URLs externas: somente o endpoint público `wa.me` usado para envio do pedido.
- Validação das regras de entrega, retirada, CNPJ, atacado e embalagens industriais no código: aprovado.

## Observação sobre teste visual automatizado
O smoke test com Chromium/Playwright está incluído no repositório, porém o navegador headless deste ambiente bloqueou navegação local por política administrativa (`ERR_BLOCKED_BY_ADMINISTRATOR`). Por isso, não foi registrado como teste visual executado neste ambiente.

Antes da publicação definitiva, recomenda-se abrir a V30 em um celular real e em um desktop apenas para a conferência visual final de produção.

## V30 — bloqueio por horário
- Teste estático confirma configuração de fuso e expediente.
- Teste confirma existência dos indicadores de disponibilidade em início, carrinho e checkout.
- Teste confirma que os botões de finalização recebem estado `disabled` quando o atendimento está fechado.
- Smoke test em Chromium não pôde ser executado neste ambiente por bloqueio administrativo de navegação local; validação de sintaxe e 11 testes automatizados passaram.

- Paridade visual: layout móvel aplicado também ao desktop; sidebar/carrinho lateral desativados na experiência final.
- Milho verde: imagem reenquadrada e destacada.

## Atualizações validadas na V30
- Novos preços e pesos de frutas conferidos no catálogo.
- Campo de observações do pedido mantido no WhatsApp e destacado no checkout.
- Nova logomarca aplicada aos ícones PWA, Apple Touch Icon, favicon e identidade do aplicativo instalado.
- Cache da PWA atualizado para evitar permanência de ícones e arquivos antigos após a publicação.
