import { KitchenComponent } from './kitchen.component';

import { Routes } from '@angular/router';

export const kitchenRoutes: Routes = [
  {
    path: '',
    component: KitchenComponent,
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
