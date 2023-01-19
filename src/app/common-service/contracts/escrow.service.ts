import { Inject, Injectable, Optional } from '@angular/core';
import { BigNumber, ethers, providers } from 'ethers';
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

  async buyToken(id: Number, tokens: BigNumber): Promise<undefined> {

    if (this.escrow == null) return;
    let signer = this.signer$.value!;
    const token = new ethers.Contract(environment.tokenAddress, TestToken.abi, this.signer$.value!)

    let property = await this.escrow.getProperty(id)
    let price = BigNumber.from(property.pricePer)
    let allowance = BigNumber.from(await token.allowance(this.provider.account.value, this.escrow.address))
    if (allowance.gte(price.mul(tokens))) {
      console.log("Has the right price", price.mul(tokens), allowance)
    } else {
      console.log("Approving for ", price.mul(tokens))
      await token.approve(this.escrow.address, price.mul(tokens))
    }

    await this.escrow.buyToken(id, tokens);
    return;
  }

  async getCosts() : Promise<{tokensLeft: number, pricePer: string}[]> {
    if (this.escrow == null) {
      console.log("Escrow is null")
      return [];
    }

    console.log("Escrow", this.escrow);
    let vals = []
    for (let i = 0; i < 4; i++) {
      let p = {
        "tokensLeft": await this.tokensLeft(i + 1),
        "pricePer": await this.pricePer(i + 1)
      }
      console.log("got one");
      vals.push(p)
    }
    return vals
  }

}
