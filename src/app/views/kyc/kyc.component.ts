import Veriff from '@veriff/js-sdk';
import { createVeriffFrame } from '@veriff/incontext-sdk';
import { Component, OnInit } from '@angular/core';
import { WalletProvider } from 'src/app/common-service/provider/provider.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
})
export class KycComponent implements OnInit {
  constructor(public provider: WalletProvider) {}

  veriff: any;
  veriffOpen: boolean = false;

  ngOnInit() {
    this.veriff = Veriff({
      apiKey: '8be90c62-dbd1-4bdf-baf2-79731a128158',
      parentId: 'veriff-root',
      onSession: (_err: any, response: any) => {
        const veriffFrame = createVeriffFrame({
          url: response.verification.url,
          onEvent: function (event: any) {
            console.log(event, 'event');
          },
        });
      },
    });
  }

  signMessage() {
    this.provider
      .signMessage('I am the person I say I am')
      .then((signedMessage: string) => {
        let data = `I am the person I say I am-${this.provider.account.value}-${signedMessage}-${this.provider.chain.value}`;
        this.veriff.setParams({
          person: {
            givenName: '',
            lastName: '',
          },
          vendorData: data, // name+0xaddress+0xsigned name
        });
        this.veriff.mount({
          submitBtnText: 'Get verified',
        });
        this.veriffOpen = true;
      });
  }
}
