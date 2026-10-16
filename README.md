# HS Hortigranjeiro Schulz — App de Pedidos V24

Versão de produção do catálogo digital/PWA da nova linha HS.

# HS Hortigranjeiro — App de Pedidos V21

Versão comercial, mobile-first e instalável (PWA) do catálogo da nova linha de produtos processados e higienizados da HS Hortigranjeiro Schulz.

## Melhorias da V21
- Cards dos produtos reforçados com identidade visual em verde, tanto na home quanto no catálogo.
- Botão “Ver produtos” do hero reduzido e reposicionado para melhor leitura da arte inicial.
- Inclusão de novos itens enviados nesta etapa, com fotos reais adicionais no catálogo.
- Revisão textual com correções de acentuação, pontuação e melhorias de clareza na experiência do cliente.
- Seleta de legumes com opção de pedir sem milho ou com milho verde em conserva (+ 80 g / R$ 3,49).
- Mix de forno com observação destacada: a embalagem pode ir ao forno sem a tampa.
- Carrinho, pedido via WhatsApp, personalização da salada de frutas, filtros e PWA preservados.

## Linhas do catálogo
- Processados
- Frutas
- Saladas
- Kits

## Observação
A salada de frutas permanece personalizável. As frutas disponíveis podem ser alteradas em `FRUIT_OPTIONS`, no arquivo `assets/js/app.js`.


## V21 — acabamento comercial e novos itens

- Hero principal segue com arte única responsiva e CTA mais discreto, menor e mais abaixo.
- Apenas o botão **Ver produtos** continua interativo dentro do banner.
- Cards de produto da página inicial e do catálogo usam o mesmo componente com destaque visual em verde.
- Finalização do pedido abre o WhatsApp com a mensagem organizada em: **Nome, Telefone, Endereço, Forma de pagamento, Observações e Pedido**.
- A seleta de legumes agora possui escolha de versão sem milho ou com milho verde em conserva.
- O número oficial da HS não foi presumido. Para envio direto a um número específico, preencha `HS_WHATSAPP_NUMBER` em `assets/js/app.js` no formato `55DDDNUMERO`. Se ficar vazio, o WhatsApp abre com a mensagem pronta para o cliente escolher o contato.
- Chaves do carrinho foram estabilizadas (`hs-cart-v1`) e há migração automática do armazenamento da versão anterior.
