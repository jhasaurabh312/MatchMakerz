import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { LoginComponent } from './pages/login/login.component'
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { GetOTPComponent } from './pages/get-otp/get-otp.component';
import { ClientsComponent } from './pages/clients/clients.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'get-otp', pathMatch: 'full'},
  { path : 'get-otp', component : GetOTPComponent }, 
  { path : 'login', component : LoginComponent },
  { path: 'my-profile', component:  MyProfileComponent},
  { path : 'personal-details', component : PersonalDetailsComponent},  
  { path : 'clients' , component : ClientsComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
