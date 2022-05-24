import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { FoundersComponent } from './views/founders/founders.component';
import { SolutionComponent } from './views/solution/solution.component';
import { FaqsComponent } from './views/faqs/faqs.component';
import { AboutComponent } from './views/about/about.component';
import { HeaderComponent } from './views/common/header/header.component';
import { FooterComponent } from './views/common/footer/footer.component';
import { CominsoonComponent } from './views/common/cominsoon/cominsoon.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { MarketplaceComponent } from './views/marketplace/marketplace.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { DetailsComponent } from './views/marketplace/details/details.component';
import { SigninComponent } from './views/signin/signin.component';
import { RegistrationComponent } from './views/registration/registration.component';
import { PersonalInformationComponent } from './views/registration/personal-information/personal-information.component';
import { WalletComponent } from './views/registration/wallet/wallet.component';
import { ContainerComponent } from './views/registration/container/container.component';
import { KycComponent } from './views/registration/kyc/kyc.component';
import { ForgotPasswordComponent } from './views/signin/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/signin/reset-password/reset-password.component';
@NgModule({
  declarations: [
    AppComponent,
    FoundersComponent,
    SolutionComponent,
    FaqsComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    CominsoonComponent,
    MarketplaceComponent,
    DetailsComponent,
    SigninComponent,
    RegistrationComponent,
    PersonalInformationComponent,
    WalletComponent,
    ContainerComponent,
    KycComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, SlickCarouselModule, LightboxModule, ToastrModule.forRoot(), NgbModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
