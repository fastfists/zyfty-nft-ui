import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }

  isLogin = false;

  ngOnInit(): void {
    let user = localStorage.getItem('user')
    if (user) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  redirectToPage() {
    this.router.navigate(['/'], { fragment: 'nftForm' });
  }

  logOut() {
    this.isLogin = false;
    localStorage.clear();
    this.router.navigate(['/'])
  }
}
