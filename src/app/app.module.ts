import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { FoundersComponent } from './views/founders/founders.component';
import { FaqsComponent } from './views/faqs/faqs.component';
import { AboutComponent } from './views/about/about.component';
import { HeaderComponent } from './views/common/header/header.component';
import { FooterComponent } from './views/common/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { SlickCarouselModule } from 'ngx-slick-carousel';
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
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AccountComponent } from './views/dashboard/account/account.component';
import { EscrowComponent } from './views/dashboard/escrow/escrow.component';
import { DashboardkycComponent } from './views/dashboard/kyc/dashboardkyc.component';

@NgModule({
  declarations: [
    AppComponent,
    FoundersComponent,
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
    DashboardkycComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, SlickCarouselModule, LightboxModule,
    ToastrModule.forRoot(), NgbModule, AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfXLngkdMTHRaUbbPw8ya8m_I7AzLAjMo'
    })],
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
