import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,   
    FormsModule,
    RouterModule,
    LoginModule,
        // HttpClient, 
  ],
  providers: [
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
