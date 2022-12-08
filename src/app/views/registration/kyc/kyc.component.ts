import { DOCUMENT } from '@angular/common';
import { Veriff } from "@veriff/js-sdk";
import { createVeriffFrame } from "@veriff/incontext-sdk";
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Provider } from 'src/app/common-service/provider/provider.service';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit {

  constructor(private renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document, public provider: Provider) { }

  veriff: any

  ngOnInit() {
    this.veriff = Veriff({
      apiKey: "1c39ab59-56b6-4c7f-8b9e-90431082b04b",
      parentId: "veriff-root",
      onSession: (_err: any, response: any) => {
        console.log("sessions", response, _err);
  
        const veriffFrame = createVeriffFrame({
          url: response.verification.url,
          onEvent: function(event: any) {
            console.log(event, "event");
          }
        });
      }
    });
    console.log("Veriff", this.veriff);
    this.provider.account.asObservable().subscribe((account: string) => {
      if (account != "") {
      }
    });

  }

  signMessage() {
    this.provider.signMessage("I am the person I say I am").then(
        (signedMessage: string) => {
        this.veriff.setParams({
            person: {
              givenName: '',
              lastName: '',
            },
            vendorData: signedMessage, // base64 encode name+0xaddress+0xsigned name
        });
        this.veriff.mount({
            submitBtnText: 'Get verified'
        });
  });

  }

}
