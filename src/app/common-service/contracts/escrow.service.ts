import { Injectable } from '@angular/core';
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
          next: (data) => {
              if (data != null) {
                this.escrow = new ethers.Contract(environment.escrowAddress, TokenFactory.abi, data)
              }
          }
      });
  }

  async tokensLeft(id: Number) {
    if (this.escrow == null) return null;
    return await this.escrow.tokensLeft(id)
  }

  async pricePer(id: Number) {
    if (this.escrow == null) return null;

    return this.escrow.pricePer(id)
  }

  async buyToken(id: Number, tokens: Number) {

    if (this.escrow == null) return;
    const token = new ethers.Contract(environment.tokenAddress, TestToken.abi, this.signer$.value!)

    // approve optional
    let property = await this.escrow.getProperty(id)
    let price = property.pricePer.toNumber()
    await token.approve(this.escrow.address, price)

    await this.escrow.buyToken(id, tokens);
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

  observeTokens() {
  }

}
