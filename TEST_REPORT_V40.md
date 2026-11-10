# HS Hortigranjeiro Schulz — V40

- 25/25 testes automatizados passaram com `npm test`.
- `node scripts/build.mjs` finalizou e gerou a pasta `dist` com 40 produtos e arquivos PWA.
- Foram ajustadas 27 opções de embalagens de 5 kg, aumentando o preço que estava na V39 em 15%.
- As embalagens de 3 kg e os itens padrão foram preservados.
- Não há desconto exibido para PF nem PJ sem CNPJ.
- Desconto de 15% para PJ com CNPJ completo aplicado sobre o valor público no checkout.
- Título dinâmico para exibir '5 kg' corretamente em detalhe, carrinho e pedido WhatsApp.
- O teste visual em navegador foi bloqueado (`ERR_BLOCKED_BY_ADMINISTRATOR`), portanto é necessária uma conferência real em navegador antes de publicar.

**ATENÇÃO:** Preço público = preço anterior x 1,15. Desconto PJ = preço público x 0,85. Como são operações diferentes de inversão de desconto, o valor líquido pode não ser igual ao preço mostrado na V39.
