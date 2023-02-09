import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { TeamComponent } from './views/team/team.component';
import { FaqsComponent } from './views/faqs/faqs.component';
import { AboutComponent } from './views/about/about.component';
import { HeaderComponent } from './views/common/header/header.component';
import { FooterComponent } from './views/common/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { LightboxModule } from 'ngx-lightbox';
import { SigninComponent } from './views/signin/signin.component';
import { RegistrationComponent } from './views/registration/registration.component';
import { PersonalInformationComponent } from './views/registration/personal-information/personal-information.component';
import { WalletComponent } from './views/registration/wallet/wallet.component';
import { ContainerComponent } from './views/registration/container/container.component';
import { KycComponent } from './views/registration/kyc/kyc.component';
import { ForgotPasswordComponent } from './views/signin/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/signin/reset-password/reset-password.component';
import { JwtInterceptor } from './auth-guard/jwt-interceptor';
import { NftmarketComponent } from './views/nftmarket/nftmarket.component';
import { NftDetailsComponent } from './views/nftmarket/modal/nft-details/nft-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AccountComponent } from './views/dashboard/account/account.component';
import { EscrowComponent } from './views/dashboard/escrow/escrow.component';
import { DashboardkycComponent } from './views/dashboard/kyc/dashboardkyc.component';
import { EmailComponent } from './views/dashboard/email/email.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    FaqsComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    RegistrationComponent,
    PersonalInformationComponent,
    WalletComponent,
    ContainerComponent,
    KycComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NftmarketComponent,
    NftDetailsComponent,
    DashboardComponent,
    AccountComponent,
    EscrowComponent,
    DashboardkycComponent,
    EmailComponent,
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LightboxModule,
    ToastrModule.forRoot({
      iconClasses : {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      }
    }),
    NgbModule,
	NgbProgressbarModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule { }
