# Segurança

- Nenhuma credencial ou segredo deve ser armazenado no frontend.
- Nenhum dado pessoal é persistido pelo aplicativo nesta versão.
- O carrinho armazena apenas IDs e quantidades no `localStorage`.
- O ambiente de produção deve utilizar HTTPS.
- Integrações de pagamento exigirão um backend seguro; não implemente chaves secretas no cliente.
