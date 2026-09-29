import {execFileSync} from 'node:child_process';
if(process.env.VERCEL_ENV==='production') execFileSync(process.execPath,['scripts/check-production.mjs'],{stdio:'inherit'});
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit'});
