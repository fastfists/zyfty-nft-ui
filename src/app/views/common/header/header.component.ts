import { Component, OnInit } from '@angular/core';
import { WalletProvider } from 'src/app/common-service/provider/provider.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private provider: WalletProvider,
    private toastr: ToastrService
  ) {}

  isConnected$?: BehaviorSubject<boolean> = undefined;
  address$!: BehaviorSubject<any>;

  ngOnInit(): void {
    this.address$ = this.provider.account;
    this.isConnected$ = this.provider.connected;
  }

  connect() {
    // Connects to the wallet
    const worked = this.provider.connect();
    if (!worked) {
      this.toastr.error('Please install MetaMask', '', {
        positionClass: 'toast-bottom-left',
      });
    }
  }

  disconnect() {
    this.provider.disconnect();
  }
}
