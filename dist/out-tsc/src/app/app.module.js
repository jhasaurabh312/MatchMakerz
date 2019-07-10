import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StickyModule } from 'ng2-sticky-kit';
import { AppComponent } from './app.component';
import { LoginModule } from './shared/models/login/login.module';
import { LoginService } from './shared/services/login/login.service';
import { LoginComponent } from './pages/login/login.component';
import { FilterComponent } from './pages/filter/filter.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { HttpClientModule } from '@angular/common/http';
import { GetOTPComponent } from './pages/get-otp/get-otp.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CarouselComponent } from './pages/carousel/carousel.component';
import { AwaitedComponent } from './pages/awaited/awaited.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap';
import { MatchesComponent } from './pages/matches/matches.component';
import { ConnectedComponent } from './pages/connected/connected.component';
import { SocialDetailsComponent } from './pages/social-details/social-details.component';
import { EducationalDetailsComponent } from './pages/educational-details/educational-details.component';
import { ClientFamilyComponent } from './pages/client-family/client-family.component';
import { ClientPreferencesComponent } from './pages/client-preferences/client-preferences.component';
import { ClientProfileComponent } from './pages/client-profile/client-profile.component';
import { DeclinedComponent } from './pages/declined/declined.component';
import { ShortlistedComponent } from './pages/shortlisted/shortlisted.component';
import { PlansComponent } from './pages/plans/plans.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MatSlideToggleModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { EditPersonalComponent } from './pages/edit-personal/edit-personal.component';
// import {ngMaterialDatePicker} from 'ng-material-datetimepicker';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                LoginComponent,
                FilterComponent,
                ClientsComponent,
                MyProfileComponent,
                PersonalDetailsComponent,
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
                ShortlistedComponent,
                PlansComponent,
                EditPersonalComponent
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
                BrowserAnimationsModule,
                BrowserModule,
                MatInputModule,
                MatButtonModule,
                MatSelectModule,
                MatIconModule,
                MatAutocompleteModule,
                MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatSnackBarModule
                // ngMaterialDatePicker
            ],
            providers: [
                LoginService,
                FilterComponent,
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map