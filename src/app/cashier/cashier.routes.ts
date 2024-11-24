import { CashierComponent } from './cashier.component';

import { Routes } from '@angular/router';

export const cashierRoutes: Routes = [
  {
    path: '',
    component: CashierComponent,
    children: [
      {
        path: 'transaction-history',
        loadComponent: () =>
          import('./transaction-history/transaction-history.component').then(
            (m) => m.TransactionHistoryComponent,
          ),
      },
      {
        path: '',
        redirectTo: 'transaction-history',
        pathMatch: 'full',
      },
    ],
  },
];
