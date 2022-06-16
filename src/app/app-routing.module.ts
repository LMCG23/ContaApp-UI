import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { CheckloginGuard } from './shared/guards/checklogin.guard';
import { ChecklogoutGuard } from './shared/guards/guardLogout/checklogout.guard';


export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/login-page', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[CheckloginGuard],
      },

      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule),
        canActivate:[CheckloginGuard],
      }
    ]
  },

    {path:'login-page',
    loadChildren:() => import('./login-module/login-module.module').then(m =>m.LoginModuleModule),
    canActivate:[ChecklogoutGuard],
    },


];
