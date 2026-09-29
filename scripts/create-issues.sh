#!/usr/bin/env bash
set -euo pipefail
# Executar SOMENTE após criar repo próprio e autenticar gh: GH_REPO=tajo3f/hs-hortigranjeiro bash scripts/create-issues.sh
: "${GH_REPO:?Defina GH_REPO=owner/repository}"
command -v gh >/dev/null || { echo 'GitHub CLI (gh) necessário'; exit 1; }
gh repo view "$GH_REPO" >/dev/null
for spec in 'tipo:correcao|d73a4a|Correção' 'tipo:melhoria|0075ca|Melhoria' 'tipo:nova-funcao|0e8a16|Nova função'; do
  IFS='|' read -r label color description <<< "$spec"
  gh label create "$label" --repo "$GH_REPO" --color "$color" --description "$description" --force
 done
node - <<'NODE' | while IFS=$'\t' read -r title label body; do
  gh issue create --repo "$GH_REPO" --title "$title" --label "$label" --body "$body"
 done
import fs from 'node:fs';
for(const i of JSON.parse(fs.readFileSync('planning/issues.json','utf8'))){const label=i.type==='Correção'?'tipo:correcao':i.type==='Melhoria'?'tipo:melhoria':'tipo:nova-funcao';console.log(`${i.title}\t${label}\t${i.body.replaceAll('\n',' ')}`);}
NODE
