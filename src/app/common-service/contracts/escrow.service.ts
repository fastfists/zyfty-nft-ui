import { Inject, Injectable, Optional } from '@angular/core';
import { ethers, providers } from 'ethers';
import { BehaviorSubject, from, Observable } from 'rxjs';
import TokenFactory from "../../../artifacts/contracts/TokenEscrow.sol/TokenFactory.json";
import TestToken from "../../../artifacts/contracts/ZyftySalesContract.sol/TestToken.json";
import { environment } from '../../../environments/environment';
import { WalletProvider } from '../provider/provider.service';

@Injectable({
  providedIn: 'root'
})
export class EscrowService {

  signer$: BehaviorSubject<providers.JsonRpcSigner | null>
  escrow: ethers.Contract | null = null

  constructor(private provider: WalletProvider) {
    this.signer$ = this.provider.signer;

    this.signer$.subscribe({
      next: (signer) => {
        if (signer != null) {
          this.escrow = new ethers.Contract(environment.escrowAddress, TokenFactory.abi, signer)
        }
      }
    });
  }

  async isOpen(id: Number): Promise<boolean> {
    if (this.escrow == null) return false;
    return await this.escrow.isOpen(id);
  }

  async getTokens(id: Number): Promise<number> {
    if (this.escrow == null) return 0;
    return await this.escrow.owedTokens(id);
  }

  async tokensLeft(id: Number): Promise<number> {
    if (this.escrow == null) return 0;
    return await this.escrow.tokensLeft(id)
  }

  async pricePer(id: Number): Promise<string> {
    if (this.escrow == null) return "";
    // TODO this should be based on token decimals (this is faster)
    return ethers.utils.formatUnits(await this.escrow.pricePer(id), 18)
  }

  async buyToken(id: Number, tokens: Number): Promise<undefined> {

    if (this.escrow == null) return;
    let signer = this.signer$.value!;
    const token = new ethers.Contract(environment.tokenAddress, TestToken.abi, this.signer$.value!)

    let property = await this.escrow.getProperty(id)
    let price = property.pricePer

    if (await token.allowance(this.provider.account.value, this.escrow.address) >= price) {
      console.log("Has the right price")
    } else {
      console.log("Doesn't have the right price")
    }

    // // approve optional
    // await token.approve(this.escrow.address, price)

    await this.escrow.buyToken(id, tokens);
    return;
  }

  async getCosts() {
    if (this.escrow == null) {
      console.log("Escrow is null")
      return null;
    }

    console.log("Escrow", this.escrow);
    let vals = []
    for (let i = 0; i < 4; i++) {
      let p = {
        "tokensLeft": await this.tokensLeft(i + 1),
        "pricePer": await this.pricePer(i + 1)
      }
      vals.push(p)
    }
    return vals
  }

}
