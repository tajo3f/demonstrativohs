## V44 — 12/11/2026

- Atualizados exatamente os valores informados nas 20 capturas de tela, inclusive 5 kg sem acrescentar 15%.
- Atualizados também os preços padrão de beterraba 500 g, abóbora japonesa sem casca 500 g e quiabo fatiado 500 g.
- Desconto de 15% após CNPJ preservado, sem alteração nas demais regras comerciais.
- Fonte e `dist/` sincronizadas, cache PWA atualizado, testes automatizados específicos da versão.
- Listagem auditável em `PRECOS_V44_CONFERENCIA.csv` e `ATUALIZACAO_V44.txt`.

## V43 — preço cheio até CNPJ, imagem do abacaxi aguardando envio

- 27 embalagens de 5 kg: valores públicos recalculados para que o desconto PJ de 15% resulte nos preços da coluna “5 KG 15%”.
- Produto abacaxi sem tempero sem foto, “Foto em breve”. Foto do temperado preservada.
- Versão JS/CSS e cache PWA atualizados.

## V42 — 10/11/2026 — Adequação da coluna 5 KG 15%
- Ajustadas 27 embalagens industriais de 5 kg aos preços da coluna "5 KG 15%" fornecida.
- Preços públicos integrais; redução adicional de 15% somente após seleção PJ e inserção de CNPJ.
- Mantidos os preços de 3 kg, produtos avulsos, dois abacaxis, regras comerciais e identidade visual.
- Novo cache PWA, URL de JS e testes para validar todos os preços de 5 kg.

## V39 — 10/11/2026
- As embalagens de 5 kg mostram o preço normal cadastrado, sem dividir o valor por 0,85.
- Os 15% são deduzidos exclusivamente após seleção PJ e informação de CNPJ.
- Ajustes nos textos, cálculo do carrinho, total do WhatsApp e cache PWA.

## V38 — 10/11/2026
- Removido do catálogo o abacaxi temperado com limão e sal rosa de 300 g (R$ 8,99).
- Mantido como único abacaxi o produto sem tempero, 250 g, por R$ 5,99.
- Atualização do cache do PWA e da referência de versão do JavaScript para celulares e computadores.
- Nenhum outro preço ou regra comercial alterado.

## V37 — 10/11/2026 — atualização exclusiva de preços laranja

- Atualizados os valores destacados em laranja na coluna SUGESTÃO: abobrinha italiana (todos os cinco cortes do catálogo) R$ 5,75; aipim R$ 3,99; batata-doce R$ 6,49; laranja pera R$ 3,99.
- Na coluna “5 KG 15%” foram conferidos os nove grupos destacados em laranja. O único preço industrial divergente da V36 era batata-inglesa 5 kg: de R$ 64,95 para R$ 48,99. Os demais já estavam corretos e foram mantidos.
- Permanecem inalterados descontos, regras de entrega, layout, imagens, produtos e outras precificações. Cache PWA e link do JavaScript atualizados para publicar com segurança.

## V36 — 07/11/2026

- Seção de benefícios da tela inicial agora utiliza as quatro imagens de ícones verdes recebidas do cliente.
- Substituídos símbolos/emojis pelos ícones otimizados, com alinhamento, contraste, espaçamento e tipografia unificados.
- Copy dos benefícios ajustada para comunicação mais orientada ao consumidor.
- Breakpoints responsivos adaptados para celular e computador sem distorção.
- Cache e versões de recursos PWA atualizados, preservando catálogo, carrinho e checkout da V35.

## V31 — 29/10/2026

- Nova logomarca oficial fornecida pela cliente aplicada ao cabeçalho, menu lateral, telas internas e áreas de instalação.
- Ícones do PWA atualizados para Android, iPhone/iPad e computador, incluindo Apple Touch Icon, favicon e ícones maskable.
- Cache da PWA versionado para V31 para evitar que aparelhos instalados continuem exibindo a identidade anterior.

## V30 — 28/10/2026
- Atualizados os preços: abacaxi temperado (R$ 8,99), mamão 250 g (R$ 5,99), melão 250 g (R$ 7,99), manga Palmer 250 g (R$ 5,99), kiwi 250 g (R$ 17,35), goiaba 250 g (R$ 7,99) e salada de frutas 200 g (R$ 9,99).
- Campo de observações do pedido reforçado no checkout para alterações, preferências e instruções de entrega.
- Identidade visual do app/PWA, ícones de instalação, Apple Touch Icon e favicon atualizados com a nova logomarca oficial enviada pela cliente.
- Cache da PWA atualizado para V30.

# Changelog

## V29 — 26/10/2026
- Interface do computador unificada ao fluxo visual e funcional da versão móvel.
- Navegação inferior, cards, checkout e modal de produto passam a seguir a mesma experiência em qualquer tela.
- Barras laterais exclusivas de desktop foram removidas da experiência final para evitar divergências.
- Foto do milho verde foi reenquadrada em 4:3, com o produto mais alto e mais visível.
- Cache da PWA atualizado para V29 e CSS/JS com versionamento para evitar arquivos antigos no navegador.

## V28 — 26/10/2026
- Finalização de pedidos bloqueada automaticamente fora do horário de funcionamento da HS.
- Botões de “Finalizar pedido” e “Enviar pelo WhatsApp” ficam desativados e cinza quando o atendimento está fechado.
- Indicador de disponibilidade foi adicionado à tela inicial, ao carrinho e à finalização.
- O cliente continua podendo navegar, escolher produtos e montar o carrinho fora do horário; o pedido fica salvo para finalizar quando reabrir.
- Verificação usa o fuso America/Sao_Paulo e atualiza automaticamente a cada minuto.
- Horário configurado: segunda a sexta, 07:30–11:00 e 12:00–18:00; sábado, 07:30–11:00 e 12:00–16:00; domingo fechado.

## V27 — 26/10/2026
- Nova identidade visual oficial HS aplicada ao site, PWA e favicon.
- Preços destacados na planilha da cliente atualizados nos produtos correspondentes do catálogo.
- Embalagens industriais adicionadas somente nos produtos indicados na planilha; Casadinho de Repolhos e Mix de Folhas seguem a apresentação industrial de 3 kg indicada.
- Condições PJ/CNPJ e atacado adicionadas: 15% no atacado com 10 unidades de cada item e condições industriais.
- Taxa de entrega de R$ 10,00, regiões atendidas e cronograma de pedidos/entregas visíveis no site e na finalização.
- Retirada renomeada para “Retirada no HS Hortigranjeiro Schulz”, com antecedência de 48 horas e sem taxa.
- Status “Sistema em fase de implantação” incluído de forma comercial e discreta.
- Checkout atualizado com tipo de cliente, CNPJ, regras dinâmicas, entrega e troco calculado.
- WhatsApp oficial mantido em +55 27 99908-7648.
- Segurança estática reforçada com CSP e sem segredos no repositório.

## V40 — Preços 5 kg e títulos dinâmicos
HS HORTIGRANJEIRO SCHULZ — V40 | Preço público das embalagens de 5 kg

1. Ajustados os preços públicos de 27 opções de embalagens de 5 kg, acrescentando 15% ao preço anteriormente exibido na V39 (arredondamento em centavos).
2. O catálogo exibe o novo valor CHEIO ao cliente PF e à PJ antes de informar um CNPJ completo.
3. A redução de 15% é aplicada SOMENTE ao selecionar pessoa jurídica e informar CNPJ com 14 dígitos na finalização.
4. Exemplo: Batata-inglesa em canoas, 5 kg: R$ 48,99 (V39) -> R$ 56,34 (V40, público); com CNPJ -> R$ 47,89.
5. Selecionando embalagem de 5 kg, título do produto, carrinho e WhatsApp passam a mostrar 5 kg, sem exibir 500 g incorretamente.
6. Embalagens de 3 kg não foram alteradas. Os preços das embalagens comuns também permanecem iguais.
7. PWA e app.js receberam nova identificação de cache V40.
8. IMPORTANTE: O CNPJ é aceito pelo preenchimento de 14 dígitos; a situação na Receita não é consultada.
9. A regra de atacado de 10 itens iguais e CNPJ foi preservada.

PUBLICAÇÃO: Se a versão V39 já está no GitHub, aplique o ZIP de atualização sobre os arquivos existentes (preservando as imagens); ou publique o ZIP completo, apontando o root para a pasta V40.
ATENÇÃO: O novo preço foi calculado literalmente como V39 + 15%; o preço com desconto de 15% sobre esse novo valor não é exatamente igual ao antigo preço da V39.

