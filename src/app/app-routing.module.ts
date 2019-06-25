import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { LoginComponent } from './pages/login/login.component'
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { GetOTPComponent } from './pages/get-otp/get-otp.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CarouselComponent } from './pages/carousel/carousel.component';
import { AwaitedComponent } from './pages/awaited/awaited.component';
import { EducationalDetailsComponent } from './pages/educational-details/educational-details.component';
import { SocialDetailsComponent } from './pages/social-details/social-details.component';
import { ClientFamilyComponent } from './pages/client-family/client-family.component';
import { ClientPreferencesComponent } from './pages/client-preferences/client-preferences.component';
import { FilterComponent } from './pages/filter/filter.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { ClientProfileComponent } from './pages/client-profile/client-profile.component';
import { ConnectedComponent } from './pages/connected/connected.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { DeclinedComponent } from './pages/declined/declined.component';
import { DummyComponent } from './pages/dummy/dummy.component';
import { PlansComponent } from './pages/plans/plans.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'get-otp', pathMatch: 'full'},
  { path : 'carousel' , component : CarouselComponent},
  { path : 'get-otp', component : GetOTPComponent }, 
  { path : 'login', component : LoginComponent },
  { path: 'my-profile', component:  MyProfileComponent},
  { path : 'personal-details', component : PersonalDetailsComponent},  
  { path : 'clients' , component : ClientsComponent},
  { path : 'edit-profile', component : EditProfileComponent},
  { path : 'signup' , component : SignupComponent},
  { path : 'personal-details ' , component : PersonalDetailsComponent},
  { path : 'awaited' , component : AwaitedComponent},
  { path : 'educational-details' ,component : EducationalDetailsComponent},
  { path : 'social-details' ,component : SocialDetailsComponent},
  { path : 'client-family' ,component : ClientFamilyComponent},
  { path : 'client-preferences' ,component : ClientPreferencesComponent},
  { path : 'matches' ,component : MatchesComponent},
  { path : 'client-profile' , component : ClientProfileComponent},
  { path : 'connected' , component : ConnectedComponent},
  { path : 'filter' , component : FilterComponent},
  { path : 'declined' , component : DeclinedComponent},
  { path : 'notification' ,component : NotificationComponent},
  { path : 'dummy' , component : DummyComponent},
  { path: 'plans' , component : PlansComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
