import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { CheckIsLoggedGuard } from './shared/guards/checkIsLogged/check-is-logged.guard';
import { CheckloginGuard } from './shared/guards/checklogin.guard';


export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/login-page', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[CheckIsLoggedGuard]
      },

      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule),
        canActivate:[CheckIsLoggedGuard]
      }
    ]
  },

    {path:'login-page',
    loadChildren:() => import('./login-module/login-module.module').then(m =>m.LoginModuleModule),
    canActivate:[CheckloginGuard],
    },


];
