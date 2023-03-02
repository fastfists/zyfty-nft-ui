import { Component, Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WalletProvider } from '../../common-service/provider/provider.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
@Injectable({
  providedIn: 'root', // just before your class
})
export class DashboardComponent implements OnInit {
  page = 'Account';
  connected = this.provider.connected;

  constructor(private provider: WalletProvider, private toastr: ToastrService) {}

  switchPage(page: string) {
    this.page = page;
  }

  connectWallet() {
    const worked = this.provider.connect();
    if (!worked) {
      this.toastr.error('Please install MetaMask', '', {
        positionClass: 'toast-bottom-left',
      });
    }
  }

  ngOnInit(): void {}
}
