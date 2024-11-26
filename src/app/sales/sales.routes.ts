import { Routes } from '@angular/router';

import { SalesComponent } from './sales.component';

export const salesRoutes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      {
        path: 'table-management',
        loadComponent: () =>
          import('./table-management/table-management.component').then(
            (m) => m.TableManagementComponent,
          ),
      },
      {
        path: 'order',
        loadComponent: () =>
          import('./order/order.component').then((m) => m.OrderComponent),
      },
      {
        path: '',
        redirectTo: 'table-management',
        pathMatch: 'full',
      },
    ],
  },
];
