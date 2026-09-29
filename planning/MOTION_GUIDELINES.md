# Motion e qualidade visual — critérios de aceite

Referências técnicas a instalar no ambiente com rede:

- https://github.com/kylezantos/design-motion-principles (`npx skills add kylezantos/design-motion-principles`)
- https://github.com/emilkowalski/skills (`npx skills@latest add emilkowalski/skills`)

## Decisões para esta vitrine e-commerce

1. Alta frequência (filtros, quantidade): resposta imediata com mudança de cor/estado, sem animação longa.
2. Entradas de cards: leve fade + 7px `translateY`, 320ms; desabilitado para redução de movimento. Não fazer animações decorativas em loop.
3. Drawer: translação lateral 280ms; overlay entra em 180ms; teclado prende foco e Escape fecha.
4. Botão de adicionar: texto passa temporariamente para `Adicionado ✓`; toast informa conclusão. Não usar spinner artificial em operação síncrona.
5. Skeleton no contêiner inicial substituído imediatamente após renderização. Futuras fotos abaixo da dobra devem receber `loading="lazy"`, `decoding="async"`, dimensões fixas.
6. Revisão: checar hover, foco, reduced motion, estados vazios, toque, backdrop e transições em 320/390/768/1440px.

Não adotar animação por estética vazia. Toda mudança de estado deve ser legível mesmo sem motion.
