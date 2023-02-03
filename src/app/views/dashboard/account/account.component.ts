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
  symbol = "";
  name = "";
  infoLoaded = false;
  allowTestToken = true;

  constructor(private provider: WalletProvider, private token: TokenService) {
  }

  ngOnInit(): void {
    this.account.subscribe({
      next: async (account) => {
        if (account != null) {
          [this.balance, this.symbol, this.name] = await this.loadTokenInfo();
          this.infoLoaded = true;
        }
      }
    });
  }

  async mintMore() {
    await this.token.mintMore();
  }

  async addToWallet() {
    await this.token.addToWallet();
  }

  async loadTokenInfo(): Promise<[number, string, string]> {
    return [
      await this.token.balance(),
      await this.token.symbol(),
      await this.token.name()
    ]
  }

}
