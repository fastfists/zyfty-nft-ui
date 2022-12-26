import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {FaqsComponent} from './views/faqs/faqs.component';
import {TeamComponent} from './views/team/team.component';
import {SolutionComponent} from './views/solution/solution.component';
import {AboutComponent} from './views/about/about.component';
import {CominsoonComponent} from './views/common/cominsoon/cominsoon.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'faqs', component: FaqsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'team', component: TeamComponent},
  {path: 'solution', component: SolutionComponent},
  {path: 'coming-soon', component: CominsoonComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: "reload",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
