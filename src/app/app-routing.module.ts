import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './components/account-components/login-page/login-page.component';
import {GeneralLayoutComponent} from './components/layout-components/general-layout/general-layout.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {MenuTableComponent} from './components/menu/menu-table/menu-table.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    data: {
      title: 'register'
    }
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: GeneralLayoutComponent,
    data: {
      title: 'Food Caring'
    },
    children: [
      {
        path: 'mainPage',
        component: MainPageComponent,
        data: {
          title: 'Main Page'
        }
      },
      {
        path: 'menus',
        component: MenuTableComponent,
        data: {
          title: 'Menus'
        }
      },
      {
        path: '',
        redirectTo: '../',
        pathMatch: 'full',
        data: {
          title: 'Main Page'
        }
      },
      {
        path: '**',
        redirectTo: 'forbidden'
      }
    ]
  },
  {
    path: 'forbidden',
    component: ErrorPageComponent,
    data: {
      title: 'Forbidden'
    }
  },
  {
    path: '**',
    redirectTo: 'forbidden'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
