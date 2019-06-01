import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// import { MatFormFieldModule, MatInputModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginModule } from './shared/models/login/login.module'
import { LoginService } from './shared/services/login/login.service'
import { LoginComponent } from './pages/login/login.component'
import { FilterComponent } from './pages/filter/filter.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { NearYouComponent } from './pages/near-you/near-you.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './pages/notification/notification.component';
import { GetOTPComponent } from './pages/get-otp/get-otp.component';
import { AwaitedInComponent } from './pages/awaited-in/awaited-in.component';
import { AwaitedOutComponent } from './pages/awaited-out/awaited-out.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { SignupComponent } from './pages/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FilterComponent,
    ClientsComponent,
    MyProfileComponent,
    NearYouComponent,
    PersonalDetailsComponent,
    NotificationComponent,
    GetOTPComponent,
    AwaitedInComponent,
    AwaitedOutComponent,
    EditProfileComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,   
    FormsModule,
    RouterModule,
    LoginModule,
    ReactiveFormsModule    
  ],
  providers: [
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
