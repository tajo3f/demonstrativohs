# HS Hortigranjeiro Schulz — Catálogo Digital V35

Aplicação web estática/PWA para catálogo e pedidos da nova linha HS.

## Publicação
Pode ser publicada em GitHub Pages, Vercel ou hospedagem estática equivalente. Não há credenciais, tokens ou segredos no projeto.

## Recursos
- Catálogo responsivo com 40 produtos e fotos locais.
- Carrinho persistente no navegador.
- Personalização da salada de frutas e da seleta.
- Embalagens industriais conforme planilha da HS.
- Fluxo de pessoa jurídica/CNPJ: desconto de 15% para 10 unidades do mesmo item e embalagens de 5 kg, liberado somente após CNPJ informado. Pessoa física compra sem desconto.
- Retirada e entrega com regras e taxa informadas.
- Pedido formatado para o WhatsApp oficial da HS.
- PWA com a identidade visual oficial atualizada.
- Compartilhamento do aplicativo via folha nativa (iOS/Android) e cópia de mensagem com link no computador.

## Testes
```bash
npm test
npm run check
python tests/browser_smoke.py
```

## Horário de pedidos
- Segunda a sexta: 07:30–11:00 e 12:00–18:00.
- Sábado: 07:30–11:00 e 12:00–16:00.
- Domingo: fechado.
- Fora desses horários, o catálogo e o carrinho continuam disponíveis, mas a finalização do pedido fica bloqueada e os controles de envio ficam cinza.
- O controle usa `America/Sao_Paulo` e é reavaliado automaticamente a cada minuto.
