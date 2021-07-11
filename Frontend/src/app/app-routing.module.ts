import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MyEstatesComponent } from './my-estates/my-estates.component';
import { NewEstateComponent } from './new-estate/new-estate.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ChatComponent } from './chat/chat.component';
import { EstatePageComponent } from './estate-page/estate-page.component';
import { InboxComponent } from './inbox/inbox.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { AccessGuard } from './access.guard';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'login', component: LoginComponent,
    data: { breadcrumb: 'Log in' },
    canActivate: [AccessGuard]
  },
  {
    path: 'signup', component: SignupComponent,
    data: { breadcrumb: 'Sign up' },
    canActivate: [AccessGuard]
  },
  {
    path: 'inbox', component: InboxComponent,
    data: { breadcrumb: 'Inbox' },
    canActivate: [AccessGuard]
  },
  {
    path: 'myestates', component: MyEstatesComponent,
    data: { breadcrumb: 'My Estates' },
    canActivate: [AccessGuard]
  },
  {
    path: 'newestate', component: NewEstateComponent,
    data: { breadcrumb: 'New Estate' },
    canActivate: [AccessGuard]
  },
  {
    path: 'usersettings', component: UserSettingsComponent,
    data: { breadcrumb: 'Settings' },
    canActivate: [AccessGuard]
  },
  {
    path: 'chat/:id/:usr', component: ChatComponent,
    data: { breadcrumb: 'Chat' },
    canActivate: [AccessGuard]
  },
  {
    path: 'chat/:id', component: ChatComponent,
    data: { breadcrumb: 'Chat' },
    canActivate: [AccessGuard]
  },
  {
    path: 'estate/:id', component: EstatePageComponent,
    data: { breadcrumb: 'Estate' },
    canActivate: [AccessGuard]
  },
  {
    path: 'userrequests', component: UserRequestsComponent,
    data: { breadcrumb: 'User Requests' },
    canActivate: [AccessGuard]
  },
  {
    path: '**', redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
