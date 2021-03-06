import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { LoginComponent } from './pages/login/login.component';
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
import { DeclinedComponent } from './pages/declined/declined.component';
import { PlansComponent } from './pages/plans/plans.component';
import { ShortlistedComponent } from './pages/shortlisted/shortlisted.component';
import { EditPersonalComponent } from './pages/edit-personal/edit-personal.component';
var appRoutes = [
    { path: '', redirectTo: 'carousel', pathMatch: 'full' },
    { path: 'carousel', component: CarouselComponent },
    { path: 'get-otp', component: GetOTPComponent },
    { path: 'login', component: LoginComponent },
    { path: 'my-profile', component: MyProfileComponent },
    { path: 'personal-details', component: PersonalDetailsComponent },
    { path: 'clients', component: ClientsComponent },
    { path: 'edit-profile', component: EditProfileComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'personal-details ', component: PersonalDetailsComponent },
    { path: 'awaited', component: AwaitedComponent },
    { path: 'educational-details', component: EducationalDetailsComponent },
    { path: 'social-details', component: SocialDetailsComponent },
    { path: 'client-family', component: ClientFamilyComponent },
    { path: 'client-preferences', component: ClientPreferencesComponent },
    { path: 'matches', component: MatchesComponent },
    { path: 'client-profile', component: ClientProfileComponent },
    { path: 'connected', component: ConnectedComponent },
    { path: 'filter', component: FilterComponent },
    { path: 'declined', component: DeclinedComponent },
    { path: 'plans', component: PlansComponent },
    { path: 'shortlisted', component: ShortlistedComponent },
    { path: 'edit-personal', component: EditPersonalComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(appRoutes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map