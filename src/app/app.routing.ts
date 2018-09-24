import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeLandingComponent } from './home/home.landing.component';
import { LoginComponent } from './login/login.component';
import { LoginSigninComponent } from './login/login.signin.component';
import { BannerMasterComponent } from './banner/bannermaster.component';
import { BannerSearchComponent } from './banner/bannersearch.component';
import { UserSearchComponent } from './profile/usersearch.component';
import { UserMasterComponent } from './profile/usermaster.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '', component: HomeLandingComponent
      }
    ]
  },
  {
    path: 'banners',
    component: HomeComponent,
    children: [
      {
        path: '', component: BannerSearchComponent
      }
    ]
  },

  {
    path: 'users',
    component: HomeComponent,
    children: [
      {
        path: '', component: UserSearchComponent
      }
    ]
  },
  {
    path: 'adduser',
    component: HomeComponent,
    children: [
      {
        path: '', component: UserMasterComponent
      }
    ]
  },
  {
    path: 'addbanner',
    component: HomeComponent,
    children: [
      {
        path: '', component: BannerMasterComponent
      }
    ]
  },
  {
    path: 'signin',
    component: LoginSigninComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
