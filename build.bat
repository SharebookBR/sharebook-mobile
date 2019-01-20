echo BUILDING PROD ENVIRONTMENT
echo import {environment} from "./environment.prod"; > environments/environment.ts
echo export let config = environment; >> environments/environment.ts
ionic cordova build android --prod --release &
git checkout environments/environment.ts
pause
