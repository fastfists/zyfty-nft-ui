import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zyfty';
  headerFooter: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.headerFooter = (event.url !== '/user/signin') && (event.url !== '/user/registration') &&
            (event.url !== '/user/registration-details') && (event.url !== '/user/forgot-password') && (event.url !== '/user/reset-password')
        }
      });
  }
}
