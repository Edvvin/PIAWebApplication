import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MyEstatesComponent } from './my-estates/my-estates.component';
import { NewEstateComponent } from './new-estate/new-estate.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    data: { breadcrumb: 'Home' },
    canActivate: []
  },
  {
    path: 'login', component: LoginComponent,
    data: { breadcrumb: 'Log in' },
    canActivate: []
  },
  {
    path: 'signup', component: SignupComponent,
    data: { breadcrumb: 'Sign up' },
    canActivate: []
  },
  {
    path: 'inbox', component: SignupComponent,
    data: { breadcrumb: 'Inbox' },
    canActivate: []
  },
  {
    path: 'myestates', component: MyEstatesComponent,
    data: { breadcrumb: 'My Estates' },
    canActivate: []
  },
  {
    path: 'newestate', component: NewEstateComponent,
    data: { breadcrumb: 'New Estate' },
    canActivate: []
  },
  {
    path: 'usersettings', component: UserSettingsComponent,
    data: { breadcrumb: 'Settings' },
    canActivate: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
