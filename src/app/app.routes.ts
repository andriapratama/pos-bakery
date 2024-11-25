import { provideRouter, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'sales',
    loadChildren: () =>
      import('./sales/sales.routes').then((m) => m.salesRoutes),
  },
  {
    path: 'cashier',
    loadChildren: () =>
      import('./cashier/cashier.routes').then((m) => m.cashierRoutes),
  },
  {
    path: 'kitchen',
    loadChildren: () =>
      import('./kitchen/kitchen.routes').then((m) => m.kitchenRoutes),
  },
  {
    path: 'bar',
    loadChildren: () => import('./bar/bar.routes').then((m) => m.barRoutes),
  },
];

export const AppRouter = provideRouter(routes);
