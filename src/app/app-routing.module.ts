import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavBarComponent } from './theme/nav-bar/nav-bar.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'authentication/login',
        pathMatch: 'full'
      },
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule)
      },
    ]
  // },{
  //   path: '',
  //   component: NavBarComponent,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: DashboardComponent
  //       // loadChildren: () => import('./').then(module => module.AuthenticationModule)
  //     },
  //     {
  //       path: 'user',
  //       component: UserComponent
  //       // loadChildren: () => import('./').then(module => module.AuthenticationModule)
  //     },
  //   ]

  // }
  },{
    path: 'dashboard',
    component: DashboardComponent
  },{
    path: 'user',
    component: UserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
