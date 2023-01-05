import { Inject, Injectable, Optional } from '@angular/core';
import { ethers, providers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import ERC20 from "../../../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import { environment } from '../../../environments/environment';
import { WalletProvider } from '../provider/provider.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  signer$: BehaviorSubject<providers.JsonRpcSigner | null>
  private token: ethers.Contract | null = null;

  address: string = environment.tokenAddress;

  constructor(private provider: WalletProvider, @Inject('tokenAddress') @Optional() public tokenAddress?: string) {
      this.signer$ = this.provider.signer;
      this.address = tokenAddress || this.address;

      this.signer$.subscribe({
          next: (signer) => {
              if (signer != null) {
                this.token = new ethers.Contract(this.address, ERC20.abi, signer)
              }
          }
      });
  }

  async symbol() : Promise<string> {
    if (this.token == null) {
      return "";
    }
    return await this.token.symbol();
  }

  async name() : Promise<string> {
    if (this.token == null) {
      return "";
    }
    return await this.token.name();
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
