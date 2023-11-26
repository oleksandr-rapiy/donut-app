import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// containers
import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';

// component
import { DonutCardComponent } from './components/donut-card/donut-card.component';
import { DonutFormComponent } from './components/donut-form/donut-form.component';
import { FormsModule } from '@angular/forms';

// services

// guards

export const routes: Routes = [
  { path: 'donuts', component: DonutListComponent },
  {
    path: 'donuts/new',
    component: DonutSingleComponent,
    data: { isEdit: false },
  },
  {
    path: 'donuts/:id',
    component: DonutSingleComponent,
    data: { isEdit: true },
  },
  { path: '', pathMatch: 'full', redirectTo: 'donuts' },
];

// @NgModule({
//   declarations: [
//     DonutListComponent,
//     DonutSingleComponent,
//     DonutCardComponent,
//     DonutFormComponent,
//   ],
//   imports: [
//     CommonModule,
//     FormsModule,
//     HttpClientModule,
//     RouterModule.forChild(routes),
//   ],
//   providers: [HttpClientModule],
// })
// export class AdminModule {}
