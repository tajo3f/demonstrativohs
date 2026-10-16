# Relatório de testes — HS Hortigranjeiro V24

## Resultado

- `node --check assets/js/app.js`: aprovado.
- `npm run check`: 19/19 testes aprovados.
- IDs HTML duplicados: 0.
- Arquivos principais referenciados no HTML ausentes: 0.
- Produtos cadastrados: 39.
- Imagens de produtos referenciadas e existentes: 39/39.
- Cache PWA: `hs-v24-shell`.
- Número oficial do WhatsApp: ainda não configurado, conforme planejado.

## Regressões cobertas

1. A finalização pode ser fechada sem preencher nome ou telefone.
2. O botão de fechar não dispara validação nativa do formulário.
3. Nome e telefone são opcionais; telefone só é validado se o cliente começar a preenchê-lo.
4. Ao escolher `Entrega`, o campo de endereço é exibido e habilitado.
5. Ao escolher `Retirada` ou `Combinar`, o campo de endereço fica oculto e desabilitado.
6. Pedidos marcados como `Entrega` não podem ser enviados sem endereço.
7. O botão `Adicionar mais itens` fecha a finalização e mantém o carrinho.
8. A mensagem do WhatsApp preserva a ordem: Nome, Telefone, Endereço, Forma de pagamento, Observações e Pedido.
9. A salada de frutas continua personalizável.
10. A seleta de legumes continua com as opções configuráveis.
11. IDs de produtos não estão duplicados.
12. Todas as imagens cadastradas no catálogo existem no pacote.

## Pendente para publicação final

Preencher `HS_WHATSAPP_NUMBER` em `assets/js/app.js` com o número oficial da HS no formato `55DDDNUMERO`.
