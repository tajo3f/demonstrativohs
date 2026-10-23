# Segurança

Este projeto é um catálogo estático/PWA. Não existem chaves privadas, tokens, senhas ou credenciais no frontend.

## Regras para publicar no GitHub
- Nunca commitar `.env`, tokens, senhas ou credenciais de hospedagem.
- O número de WhatsApp presente no código é o canal público de pedidos da HS e, por natureza, fica visível no frontend.
- Dados digitados na finalização não são persistidos em servidor pelo site; o pedido é montado localmente e enviado somente após a ação do usuário no WhatsApp.
- O carrinho e as personalizações usam `localStorage` do navegador.
- A configuração de deploy inclui CSP, bloqueio de framing, `nosniff`, política de referência e permissões restritas.

Se futuramente houver login, banco de dados, pagamentos ou painel administrativo, segredos deverão ficar exclusivamente no backend/variáveis de ambiente do provedor.
