import { Injectable } from '@angular/core';
import { ethers, providers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
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
          next: (signer) => {
              if (signer != null) {
                this.kyc = new ethers.Contract(environment.kycAddress, ZyftyKYC.abi, signer)
              }
          }
      });
  }

  async isVerified(): Promise<boolean>  {
      if (this.signer$.value == null || this.kyc == null) {
        return false;
      }
      let value: boolean = await this.kyc.hasValid(this.provider.account.value!);
      return value;
  }

}
