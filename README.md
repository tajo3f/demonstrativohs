# HS Hortigranjeiro Schulz — App Web V6

Versão totalmente redesenhada como **aplicativo de pedidos instalável (PWA)**, inspirada no mockup visual aprovado pelo usuário.

## O que contém
- Home mobile-first com banner, categorias e destaques.
- Catálogo em grade com busca e filtros.
- Detalhe do produto em modal/bottom sheet.
- Carrinho completo com quantidades, subtotal e revisão.
- Checkout demonstrativo e cópia da mensagem do pedido.
- Instalação como PWA em Android e suporte às instruções de “Adicionar à Tela de Início” no iPhone.
- Layout desktop com navegação lateral e resumo do carrinho.
- LocalStorage para persistir o carrinho.
- Service Worker e manifest.
- Sem Firebase, Supabase, framework pesado ou backend nesta etapa.

## Importante
Os preços, pesos e descrições presentes são **demonstrativos**, usados somente para validar a experiência visual. O envio real por WhatsApp está bloqueado até a empresa confirmar o número oficial e os dados comerciais.

## Executar localmente
O `index.html` abre diretamente para visualização. Para testar instalação PWA e Service Worker, rode por HTTP, por exemplo:

```bash
python -m http.server 8080
```

Depois abra `http://localhost:8080`.

## Validar
```bash
npm test
npm run check
```

## Produção
Antes de publicar, confirmar:
- WhatsApp oficial de pedidos;
- catálogo final;
- preços e pesos;
- descrições e alegações;
- política de entrega/retirada;
- política de privacidade e termos;
- domínio e identidade final.
