# Relatório de testes — HS V39

- `npm test`: 22 testes automatizados passaram.
- `node scripts/build.mjs`: gerou dist e verificou referências, imagens e sintaxe.
- Regressões: preços de 5 kg preservados antes de PJ/CNPJ; 15% após CNPJ; múltiplas unidades com arredondamento consistente; atacado de 10 unidades idênticas somente com CNPJ.
- Teste visual em navegador Chromium: execução impedida por política de segurança deste ambiente (`ERR_BLOCKED_BY_ADMINISTRATOR`). Recomendamos abrir em Chrome/Safari real após publicar.
- A verificação de CNPJ é de preenchimento de 14 dígitos (não consulta cadastro fiscal em servidor).

Regra comercial: preços cadastrados em V38 não foram alterados; somente a forma de aplicar desconto foi corrigida.
