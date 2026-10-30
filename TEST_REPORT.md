# Relatório de validação — V31

Data: 29/10/2026

## Validações concluídas
- `node --check assets/js/app.js`: aprovado.
- `node --test tests/app.test.mjs`: 11/11 testes aprovados.
- Verificação de 40 imagens de produtos locais: aprovado, sem arquivos ausentes.
- Nova logomarca oficial aplicada ao cabeçalho, áreas internas, instalação do app e elementos de identidade visual.
- Ícones PWA atualizados para Android, iPhone/iPad e computador: 180, 192 e 512 px, além de favicon 32/64 e ICO.
- Manifesto PWA atualizado com ícones `any` e `maskable` para reduzir cortes em ícones adaptativos do Android.
- Cache da PWA atualizado para V31 e arquivos de identidade versionados para evitar reaproveitamento da marca anterior.
- Verificação das referências locais do HTML: nenhuma referência ausente.
- Regras de catálogo, carrinho, checkout, WhatsApp, horários, entrega, retirada e CNPJ preservadas pelos testes existentes.

## Observação sobre teste visual automatizado
O smoke test com Chromium/Playwright está incluído no repositório, porém o navegador headless deste ambiente bloqueou a navegação local por política administrativa (`ERR_BLOCKED_BY_ADMINISTRATOR`). Por isso, ele não foi registrado como teste visual concluído neste ambiente.

Para aparelhos que já tinham uma versão anterior instalada, o sistema agora usa arquivos versionados V31. Caso algum Android ou iPhone ainda mantenha o ícone antigo por cache do sistema operacional, remova o atalho/app instalado e instale novamente após a publicação da V31.
