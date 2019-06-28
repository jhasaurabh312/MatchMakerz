import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {StickyModule} from 'ng2-sticky-kit';
import { AppComponent } from './app.component';
import { LoginModule } from './shared/models/login/login.module'
import { LoginService } from './shared/services/login/login.service'
import { LoginComponent } from './pages/login/login.component'
import { FilterComponent } from './pages/filter/filter.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './pages/notification/notification.component';
import { GetOTPComponent } from './pages/get-otp/get-otp.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CarouselComponent } from './pages/carousel/carousel.component';
import { AwaitedComponent } from './pages/awaited/awaited.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule, BsDropdownModule } from 'ngx-bootstrap';
import { MatchesComponent } from './pages/matches/matches.component';
import { ConnectedComponent } from './pages/connected/connected.component';
import { SocialDetailsComponent } from './pages/social-details/social-details.component';
import { EducationalDetailsComponent } from './pages/educational-details/educational-details.component';
import { ClientFamilyComponent } from './pages/client-family/client-family.component';
import { ClientPreferencesComponent } from './pages/client-preferences/client-preferences.component';

import { ClientProfileComponent } from './pages/client-profile/client-profile.component';
import { DeclinedComponent } from './pages/declined/declined.component';
import { DummyComponent } from './pages/dummy/dummy.component';
import { ShortlistedComponent } from './pages/shortlisted/shortlisted.component';
import { PlansComponent } from './pages/plans/plans.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FilterComponent,
    ClientsComponent,
    MyProfileComponent,
    PersonalDetailsComponent,
    NotificationComponent,
    GetOTPComponent,
    EditProfileComponent,
    SignupComponent,
    CarouselComponent,
    AwaitedComponent,
    MatchesComponent,
    ConnectedComponent,
    SocialDetailsComponent,
    EducationalDetailsComponent,
    ClientFamilyComponent,
    ClientPreferencesComponent,
    ClientProfileComponent,
    DeclinedComponent,
    DummyComponent,
    ShortlistedComponent,
    PlansComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,   
    FormsModule,
    RouterModule,
    LoginModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    StickyModule,
    BrowserAnimationsModule  
  ],
  providers: [
    LoginService,
    FilterComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
