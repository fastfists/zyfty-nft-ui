import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { FaqsComponent } from './views/faqs/faqs.component';
import { FoundersComponent } from './views/founders/founders.component';
import { SolutionComponent } from './views/solution/solution.component';
import { AboutComponent } from './views/about/about.component';
import { CominsoonComponent } from './views/common/cominsoon/cominsoon.component';
import { MarketplaceComponent } from "./views/marketplace/marketplace.component";
import { DetailsComponent } from "./views/marketplace/details/details.component";
import { SigninComponent } from "./views/signin/signin.component";
import { RegistrationComponent } from "./views/registration/registration.component";
import { ContainerComponent } from './views/registration/container/container.component';
import { ForgotPasswordComponent } from './views/signin/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/signin/reset-password/reset-password.component';
import { AuthGuard } from './auth-guard/auth.guard';
import { NftmarketComponent } from "./views/nftmarket/nftmarket.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'founders', component: FoundersComponent },
  { path: 'solution', component: SolutionComponent },
  { path: 'coming-soon', component: CominsoonComponent },
  {
    path: 'marketplace',
    children: [
      {
        path: '',
        component: MarketplaceComponent
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
      }
    ],
  },
  { path: 'user/signin', component: SigninComponent },
  { path: 'user/forgot-password', component: ForgotPasswordComponent },
  { path: 'user/reset-password', component: ResetPasswordComponent },
  { path: 'user/verify', component: SigninComponent },
  { path: 'user/registration', component: RegistrationComponent },
  { path: 'user/registration-details', component: ContainerComponent, canActivate: [AuthGuard] },
  { path: 'nft-market', component: NftmarketComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: "reload",
    }),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
