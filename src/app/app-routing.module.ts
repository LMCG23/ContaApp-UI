import { Routes } from '@angular/router';
import { LoggedInGuard } from './guards/guard-logged-in.service';
import { FullComponent } from './layouts/full/full.component';


export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/login-page', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),

      },

      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule),

      }
    ]
  },
{path:'login-page',
loadChildren:() => import('./login-module/login-module.module').then(m =>m.LoginModuleModule)
},
  {
    path: '**',
    redirectTo: '/starter'
  }

];
