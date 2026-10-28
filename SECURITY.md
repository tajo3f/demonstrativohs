# Segurança — V29

- Aplicação estática, sem banco de dados e sem credenciais privadas no frontend.
- Número público do WhatsApp da HS é o único dado externo de integração.
- Política CSP definida no HTML.
- Campos do cliente são usados apenas para montar a mensagem do pedido e não são enviados a servidores próprios.
- Carrinho e personalizações ficam no `localStorage` do navegador.
- Nenhuma chave de API, token ou senha deve ser adicionada ao repositório.
- Publicação compatível com GitHub Pages/Vercel/hospedagem estática.
