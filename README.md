# HS Hortigranjeiro Schulz — App de Pedidos V10

Aplicativo web/PWA da nova linha de produtos processados e higienizados.

## Catálogo atual

### Processados
- Abóbora jacaré em fatias para assar 500 g — R$ 3,99
- Abóbora japonesa sem casca em cubos 500 g — R$ 3,99
- Abobrinha em lâminas para lasanha 500 g — R$ 3,99
- Abobrinha em rodelas 500 g — R$ 3,99
- Abobrinha fatiada em rodelas 500 g — R$ 3,99
- Abobrinha meia-lua 500 g — R$ 3,99
- Abobrinha picada 500 g — R$ 3,99
- Aipim cortado e congelado 500 g — R$ 4,99
- Quiabo fatiado 500 g — R$ 12,49

### Kits
- Kit para sopa: inhame-chinês, chuchu, batata-inglesa e cenoura 500 g — R$ 6,49

### Saladas
- Salada de frutas — personalizável, com preço a confirmar

## Salada de frutas
O cliente pode selecionar as frutas desejadas. A seleção é salva no navegador junto ao carrinho e aparece no resumo do pedido. A lista inicial de frutas fica em `FRUIT_OPTIONS`, no arquivo `assets/js/app.js`, e pode ser ajustada conforme a disponibilidade oficial da HS.

## Organização do catálogo
O catálogo permanece organizado por linhas comerciais:
- Todos
- Processados
- Saladas
- Kits

## Executar
Abra `index.html` em um servidor local ou publique o projeto na Vercel. Para testar:

```bash
npm run check
```
