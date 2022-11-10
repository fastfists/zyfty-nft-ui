import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/common-service/provider/provider.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private provider : Provider) { 
  }

  isLogin = false;
  isConnected$? :BehaviorSubject<boolean> = undefined
  address = ""
  address$: Observable<any> = new Observable()

  ngOnInit(): void {
    let user = localStorage.getItem('user')
    if (user) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    this.address$ = this.provider.account.asObservable()
    this.isConnected$ = this.provider.connected
  }

  redirectToPage() {
    this.router.navigate(['/'], { fragment: 'nftForm' });
  }

  logOut() {
    this.isLogin = false;
    localStorage.clear();
    this.router.navigate(['/'])
  }

  connect() {
    // Connects to the wallet
    console.log("Connected", this.provider)
    this.provider.connect()
  }
}
