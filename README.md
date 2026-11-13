# CORREÇÃO TÉCNICA V44.1 — LEIA PRIMEIRO

Este pacote é uma atualização **PARCIAL** do HS V44: não inclui as fotos,
o CSS, o manifesto nem as páginas legais do site completo. Aplique sobre o
repositório original do GitHub sem excluir os demais arquivos. Consulte
`LEIA_PRIMEIRO_PUBLICACAO_V44_1.txt` para o procedimento completo.

**Os preços comerciais continuam os mesmos da V44.** Esta versão altera
somente publicação, cabeçalhos, cache PWA, versão de Node e diagnóstico.

---

# HS Hortigranjeiro Schulz — Catálogo Digital V44

Aplicação web estática/PWA para catálogo e pedidos da nova linha HS.

## Publicação
Pode ser publicada em GitHub Pages, Vercel ou hospedagem estática equivalente. Não há credenciais, tokens ou segredos no projeto.

## Recursos
- Catálogo responsivo com 41 produtos e fotos locais.
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

### V37 — acabamento da tela inicial
Ícones de praticidade, seleção de produtos, pedidos e rapidez renovados com imagens verdes WebP otimizadas.

### V37 — reajuste pontual dos preços em laranja
Valores do varejo e da embalagem industrial corrigidos somente nos itens assinalados em laranja na tabela de 03/11/2026. Detalhes no ATUALIZACAO_V37.txt.

### V38 — produto de abacaxi unificado
O catálogo mantém somente **Abacaxi sem tempero 250 g — R$ 5,99**. A opção temperada de R$ 8,99 não está mais disponível para inclusão no carrinho. Todas as outras condições e preços da V37 foram preservados.

## V39 — Regra de preços para embalagens de 5 kg
O preço cadastrado aparece normalmente. Após identificação de PJ via CNPJ de 14 dígitos, a embalagem de 5 kg recebe 15% de desconto (sem quantidade mínima). Confira ATUALIZACAO_V39.txt.

## V44 — Atualização dos preços fornecidos pela HS

- Todos os 20 itens enviados em fotos tiveram suas opções de embalagem conferidas e os preços registrados exatamente como fornecidos.
- Os preços de 5 kg não receberam acréscimo, gross-up ou divisão por 0,85.
- A regra de desconto PJ de 15% somente após CNPJ foi mantida no momento da finalização.
- Execute `npm run check` para verificar preços, lógica de desconto e sincronização da versão publicada em `dist/`.
- Veja `ATUALIZACAO_V44.txt` para a lista completa de preços.
