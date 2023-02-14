import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { FaqsComponent } from './views/faqs/faqs.component';
import { TeamComponent } from './views/team/team.component';
import { AboutComponent } from './views/about/about.component';
import { NftmarketComponent } from './views/nftmarket/nftmarket.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'team', component: TeamComponent },
  { path: 'nft-market', component: NftmarketComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      initialNavigation: 'enabledBlocking',
    }),
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
