import { Component, OnInit } from '@angular/core';
import { WalletProvider } from 'src/app/common-service/provider/provider.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private provider: WalletProvider) {}

  isConnected$?: BehaviorSubject<boolean> = undefined;
  address$!: BehaviorSubject<any>;

  ngOnInit(): void {
    this.address$ = this.provider.account;
    this.isConnected$ = this.provider.connected;
  }

  connect() {
    // Connects to the wallet
    this.provider.connect();
  }
}
