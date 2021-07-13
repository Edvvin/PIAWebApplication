import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatModule } from './mat/mat.module';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { MyEstatesComponent } from './my-estates/my-estates.component';
import { NewEstateComponent } from './new-estate/new-estate.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { EstateCardComponent } from './estate-card/estate-card.component';
import { ApproveEstatesComponent } from './approve-estates/approve-estates.component';
import { UserManipulationComponent } from './user-manipulation/user-manipulation.component';
import { ChatComponent } from './chat/chat.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { EstatePageComponent } from './estate-page/estate-page.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { GalleryCellComponent } from './gallery-cell/gallery-cell.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AllUsersComponent } from './all-users/all-users.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    InboxComponent,
    UserSettingsComponent,
    MyEstatesComponent,
    NewEstateComponent,
    UserRequestsComponent,
    EstateCardComponent,
    ApproveEstatesComponent,
    UserManipulationComponent,
    ChatComponent,
    ChatMessageComponent,
    EstatePageComponent,
    GalleryCellComponent,
    EditUserComponent,
    AllUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    BreadcrumbModule,
    FormsModule,
    HttpClientModule,
    IvyCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
