# V20 — Hero único responsivo, cards padronizados e pedido WhatsApp

- Hero comercial consolidado em uma única imagem responsiva, preservando proporção em celular, tablet e desktop.
- Botão **Ver produtos** mantido como única ação funcional dentro do hero.
- Cards da home padronizados com o mesmo componente usado no catálogo.
- Pedido do WhatsApp reorganizado para leitura rápida: Nome, Telefone, Endereço, Forma de pagamento, Observações e Pedido.
- Ação de finalização agora abre o WhatsApp com o texto pronto e também tenta copiar a mensagem para a área de transferência.
- Máscara simples para telefone/WhatsApp no checkout.
- Cache PWA atualizado para `hs-v20-shell`.

# V14 — catálogo ampliado, vitrine colorida e revisão textual

- Adicionados novos processados, frutas prontas e kits com os pesos e preços informados.
- Hero redesenhado com beterraba, abóbora e vagem, sem sobreposição entre as imagens.
- Destaques da home passaram a priorizar variedade visual e cores.
- Revisão de ortografia, acentuação, pontuação, hifenização e descrições comerciais dos produtos.
- Mantidas as correções de responsividade, carrinho e modal das versões anteriores.
- Cache do PWA atualizado para V14.

# V13 — responsividade mobile e acabamento comercial

- Hero mobile reconstruído para eliminar sobreposição entre texto e fotos.
- Vitrine de produtos isolada em uma área própria e responsiva.
- Benefícios reorganizados em uma faixa independente.
- Cabeçalho, catálogo, chips e destaques refinados para celulares.
- Cards do catálogo com até três linhas de nome, preço e botão sempre visíveis.
- Botões rápidos preservados e ajustados para toque.
- Duplicidade do estado vazio do carrinho removida do HTML.
- Ajustes adicionais para 360 px, 430 px, tablets e desktop.
- Cache/PWA atualizado para V13.

# V12 — imagens, modal e carrinho refinados

- Todas as imagens dos produtos foram redimensionadas com `object-fit: contain` para exibir o produto inteiro sem cortar ou esconder as informações do card.
- Cards do catálogo receberam proporções consistentes em desktop e mobile.
- O modal de detalhes foi redesenhado no desktop com foto e informações lado a lado e, no mobile, com foto compacta no topo.
- A seção de destaques agora possui botão `+` para adicionar produtos ao carrinho rapidamente.
- O catálogo principal mantém o botão `+` e o seletor de quantidade após a inclusão.
- O carrinho lateral do desktop agora possui ação **Remover** em cada item.
- Cache/PWA atualizado para V12.

# V11 — acabamento visual e correções responsivas

- Home redesenhada com linguagem visual inspirada na referência oficial HS.
- Hero verde com composição de produtos, CTA e benefícios da nova linha.
- Catálogo por linhas refinado com chips e ícones.
- Destaques reorganizados em cards visuais com faixa verde.
- Cards de produtos corrigidos no celular: imagem, texto, preço e botão não se sobrepõem mais.
- Nomes curtos exibidos nos cards; nomes completos preservados nos detalhes, carrinho e pedido.
- Botões de adicionar ganharam área de toque estável e alinhamento consistente.
- Mantidas funcionalidades do carrinho, PWA e personalização da salada de frutas.

# Changelog

## 10.0.0
- Revisão completa de ortografia, acentuação, pontuação e concordância em português.
- Padronização dos nomes dos produtos, pesos e descrições comerciais.
- Correções como “abóbora jacaré”, “meia-lua”, “inhame-chinês” e “batata-inglesa”.
- Textos da interface revisados para maior clareza, naturalidade e consistência.
- Cache/PWA e armazenamento local atualizados para V10.

## 9.0.0
- Adicionados os 10 produtos recebidos nesta atualização, usando os nomes e preços informados nos arquivos enviados.
- Incluídas novas fotos oficiais para abóboras, abobrinhas, aipim, kit para sopa e quiabo.
- Produtos existentes receberam os preços oficiais enviados nesta atualização.
- Adicionados abóbora jacaré em fatias, abóbora japonesa em cubos, nova opção de abobrinha em rodelas, aipim congelado e kit para sopa.
- Kit para sopa classificado na aba **Kits**; demais hortaliças na aba **Processados**.
- Salada de frutas personalizável foi mantida na aba **Saladas**.
- Imagens convertidas para WebP para reduzir peso sem alterar o conteúdo visual.
- Cache/PWA e armazenamento local atualizados para V9.

## 8.0.0
- Área da home redesenhada de “Categorias” para “Nosso catálogo”.
- Navegação do catálogo reorganizada para Todos, Processados, Saladas e Kits.
- Produtos de abobrinha e quiabo classificados como Processados.
- Salada de frutas classificada como Saladas.
- Filtro Kits preparado para os próximos produtos oficiais.
- Botões do catálogo transformados em chips minimalistas no estilo solicitado.
- Cache/PWA atualizado para V8.


## 7.0.0
- Removidos os cinco produtos demonstrativos anteriores do catálogo.
- Adicionados os cinco produtos enviados pela HS com os nomes exatamente conforme os arquivos recebidos.
- Fotos originais convertidas para WebP sem alterar o conteúdo visual.
- Adicionada Salada de frutas com montagem personalizada por seleção de frutas.
- Personalização da salada é salva no carrinho e incluída no texto do pedido.
- Produtos sem preço informado exibem “Preço a confirmar”, sem inventar valores.
- Categorias atualizadas para Abobrinha, Quiabo e Frutas.
- Service Worker e cache atualizados para V7.

