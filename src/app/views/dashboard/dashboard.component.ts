import { Component, Injectable, OnInit } from '@angular/core';
import { EscrowService } from '../../common-service/contracts/escrow.service';
import { KYCService } from '../../common-service/contracts/kyc.service';
import { WalletProvider } from '../../common-service/provider/provider.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
@Injectable({
  providedIn: 'root' // just before your class
})
export class DashboardComponent implements OnInit {

  page = "Account";
  connected = this.provider.connected;

  constructor(private provider: WalletProvider, private kyc: KYCService, private escrow: EscrowService) {
  }

  switchPage(page: string) {
    this.page = page;
  }

  connectWallet() {
    this.provider.connect();
  }

  ngOnInit(): void {
  }

}
