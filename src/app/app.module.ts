import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
