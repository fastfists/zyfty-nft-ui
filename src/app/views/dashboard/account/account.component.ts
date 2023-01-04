import { Component, Injectable, OnInit } from '@angular/core';
import { TokenService } from 'src/app/common-service/contracts/token.service';
import { WalletProvider } from 'src/app/common-service/provider/provider.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
@Injectable({
  providedIn: 'root' // just before your class
})
export class AccountComponent implements OnInit {

  account = this.provider.account;
  balance = 0;
  constructor(private provider: WalletProvider, private token: TokenService) { }

  ngOnInit(): void {
    this.token.balance().then((balance) => {
      this.balance = balance;
    })
  }

}
