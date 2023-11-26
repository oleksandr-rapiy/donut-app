import { RouterModule } from '@angular/router';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { AppRoutes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

// testing of standalone approach
bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(AppRoutes))],
}).catch((err) => console.error(err));

// default module bootstrap
// platformBrowserDynamic()
//   .bootstrapModule(AppComponent)
//   .catch((err) => console.error(err));
