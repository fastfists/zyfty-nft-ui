import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { TeamComponent } from './views/team/team.component';
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

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    SolutionComponent,
    FaqsComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    CominsoonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule,ToastrModule.forRoot()],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
