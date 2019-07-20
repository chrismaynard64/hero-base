import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppDevModule } from './app/app-dev/app-dev.module';

//import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(
  AppDevModule
    //AppModule
  )
  .catch(err => console.error(err));
