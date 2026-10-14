# HS Hortigranjeiro — App de Pedidos V20

Versão comercial, mobile-first e instalável (PWA) do catálogo da nova linha de produtos processados e higienizados da HS Hortigranjeiro Schulz.

## Melhorias da V20
- Vitrine inicial redesenhada com três produtos coloridos, sem imagens sobrepostas.
- Destaques da página inicial reorganizados para mostrar variedade de cores e linhas.
- Catálogo atualizado com os novos produtos, pesos e preços informados pela HS.
- Nomes, acentuação, pontuação, concordância e descrições revisados em português.
- Imagens dos produtos exibidas de forma proporcional, preservando o produto inteiro sempre que possível.
- Carrinho, personalização da salada de frutas, filtros e PWA preservados.

## Linhas do catálogo
- Processados
- Saladas / frutas prontas
- Kits

## Observação
A salada de frutas permanece personalizável. As frutas disponíveis podem ser alteradas em `FRUIT_OPTIONS`, no arquivo `assets/js/app.js`.


## V20 — acabamento comercial

- Hero principal substituído por uma única arte responsiva, sem sobreposição de fotos ou distorções.
- Apenas o botão **Ver produtos** é interativo dentro do banner.
- Cards de produto da página inicial usam o mesmo componente do catálogo, com imagem, nome, peso, preço e ação rápida de carrinho.
- Finalização do pedido abre o WhatsApp com uma mensagem organizada em: **Nome, Telefone, Endereço, Forma de pagamento, Observações e Pedido**.
- O número oficial da HS não foi presumido. Para envio direto a um número específico, preencha `HS_WHATSAPP_NUMBER` em `assets/js/app.js` no formato `55DDDNUMERO`. Se ficar vazio, o WhatsApp abre com a mensagem pronta para o cliente escolher o contato.
- Chaves do carrinho foram estabilizadas (`hs-cart-v1`) e há migração automática do armazenamento da versão anterior.
