import { AdminRoutes } from './admin/admin.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';
import { DonutService } from './admin/service/donut.service';

export const AppRoutes: Routes = [
  // Default using of lazy loading of modules without standalone components
  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('./admin/admin.module').then((x) => x.AdminModule),
  // },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((x) => x.AdminRoutes),
    providers: [importProvidersFrom(HttpClientModule), /* DonutService */],
  },
  { path: '', pathMatch: 'full', redirectTo: 'admin' },
  { path: '**', redirectTo: 'admin' },
];
