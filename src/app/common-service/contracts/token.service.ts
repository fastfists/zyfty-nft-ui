import { Injectable } from '@angular/core';
import { ethers, providers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import TestToken from "../../../artifacts/contracts/ZyftySalesContract.sol/TestToken.json";
import { environment } from '../../../environments/environment';
import { WalletProvider } from '../provider/provider.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  signer$: BehaviorSubject<providers.JsonRpcSigner | null>
  token: ethers.Contract | null = null;

  constructor(private provider: WalletProvider) {
      this.signer$ = this.provider.signer;

      this.signer$.subscribe({
          next: (signer) => {
              if (signer != null) {
                this.token = new ethers.Contract(environment.tokenAddress, TestToken.abi, signer)
              }
          }
      });
  }

  async balance() : Promise<number> {
    if (this.token != null) {
      let num = await this.token.balanceOf(this.provider.account.value);
      num = ethers.utils.formatUnits( num , await this.token.decimals());
      return num;
    }
    return 0;
  }
}
