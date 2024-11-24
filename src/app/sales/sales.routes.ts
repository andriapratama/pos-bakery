import { SalesComponent } from './sales.component';
import { Routes } from '@angular/router';

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
        path: '',
        redirectTo: 'table-management',
        pathMatch: 'full',
      },
    ],
  },
];
