import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component/home-page.component';
import { PanelPageComponent } from './pages/panel-page.component/panel-page.component';
import { PanelAdminPageComponent } from './pages/panel-page.component/panel-admin-page.component/panel-admin-page.component';
import { PanelUserPageComponent } from './pages/panel-page.component/panel-user-page.component/panel-user-page.component';
import { DashboardPageComponent } from './pages/dashboard-page.component/dashboard-page.component';
import { InfoPageComponent } from './pages/info-page.component/info-page.component';
import { PageNotFoundComponent } from './pages/page-not-found.component/page-not-found.component'
import { LoginGuard } from './guards/login.guard';
import { FormLoginComponent } from './shared/components/form-login/form-login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'panel',
    component: PanelPageComponent,
    canActivate: [LoginGuard],
    // children: [
    //   {
    //     path: 'admin',
    //     component: PanelAdminPageComponent,
    //   }, {
    //     path: 'user',
    //     component: PanelUserPageComponent,
    //   },
    // ]
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
  },
  {
    path: 'info',
    component: InfoPageComponent,
  },
  // {
  //   path: 'login',
  //   component: FormLoginComponent,
  // },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
