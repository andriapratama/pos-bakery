import { BarComponent } from './bar.component';

import { Routes } from '@angular/router';

export const barRoutes: Routes = [
  {
    path: '',
    component: BarComponent,
    children: [
      {
        path: 'order',
        loadComponent: () =>
          import('./order/order.component').then((m) => m.OrderComponent),
      },
      {
        path: '',
        redirectTo: 'order',
        pathMatch: 'full',
      },
    ],
  },
];
