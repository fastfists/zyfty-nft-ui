import { Injectable } from '@angular/core';
import { ethers, providers } from 'ethers';
import { BehaviorSubject, from, Observable } from 'rxjs';
import ZyftyKYC from "../../../artifacts/contracts/ZyftyKYC.sol/ZyftyKYC.json";
import { environment } from '../../../environments/environment';
import { WalletProvider } from '../provider/provider.service';

@Injectable({
  providedIn: 'root'
})
export class KYCService {
  
  signer$: BehaviorSubject<providers.JsonRpcSigner | null>
  kyc: ethers.Contract | null = null

  constructor(private provider: WalletProvider) {
      this.signer$ = this.provider.signer;

      this.signer$.subscribe({
          next: (data) => {
              if (data != null) {
                this.kyc = new ethers.Contract(environment.kycAddress, ZyftyKYC.abi, data)
              }
          }
      });
  }

  async isVerified(): Promise<boolean>  {
      console.log("Is verified?)")
      if (this.signer$.value == null) {

        console.log("Is verified?)")
        return false;
      }
      let value: boolean = await this.kyc!.hasValid(this.provider.account.value!);
      return value;
  }

}