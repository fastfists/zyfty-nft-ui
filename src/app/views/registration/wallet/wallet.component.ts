import { Component, OnInit, Output } from '@angular/core';
import { WalletProvider } from 'src/app/common-service/provider/provider.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  @Output() newWallet = new EventEmitter();

  wallet!: FormGroup;
  account$ = this.provider.account

  constructor(private provider: WalletProvider) { }

  ngOnInit(): void {

    this.wallet = new FormGroup({
      token: new FormControl(null)
    });

    this.account$ = this.provider.account
  }

  onSubmit() {
    if (this.wallet.valid) {
      console.log('wallet ::', this.wallet.value)
      // this.personalInformationService.registration(this.personalInfo.value)
      //   .subscribe(res => {
      //     return res;
      //   })
      this.addWallet('kyc')
    }
  }

  connectWallet() {
    this.provider.connect()
  }

  addWallet(value: String) {
    this.newWallet.emit(value);
  }

}
