import { Injectable, InjectionToken, Inject } from '@angular/core';
import { providers } from 'ethers';
import { BehaviorSubject, Subject } from 'rxjs';
import TokenFactory from "../../../artifacts/contracts/TokenEscrow.sol/TokenFactory.json";
import TestToken from "../../../artifacts/contracts/ZyftySalesContract.sol/TestToken.json";
import ZyftyNFT from "../../../artifacts/contracts/ZyftyNFT.sol/ZyftyNFT.json";
import { environment } from '../../../environments/environment';
import { ethers } from "ethers";

export const MetaMaskWeb3 = new InjectionToken<providers.BaseProvider>('Metamask Provider', {
  providedIn: 'root',
  factory: () => (window as any).ethereum
});

interface ProviderMessage {
  type: string;
  data: unknown;
}

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class Provider {

  account: BehaviorSubject<string> = new BehaviorSubject("")
  connected = new BehaviorSubject(false)
  ethereum: any = null;

  provider: providers.Web3Provider | null = null; 
  signer: providers.JsonRpcSigner | null = null;

  connect() {
    if (typeof this.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
    if (this.ethereum) {
      this.provider = new ethers.providers.Web3Provider(this.ethereum);
      this.ethereum.request({ method: 'eth_requestAccounts' })
          .then((accs: Array<string>) => this.handleAccountChange(accs));
    }
  }

  async connectAsync() {
    if (typeof this.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
    if (this.ethereum) {
      let accs:Array<string> = await this.ethereum.request({ method: 'eth_requestAccounts' })
      this.handleAccountChange(accs);
    }
  }

  async signMessage(message: string) {
    return await this.ethereum.request({ method: 'personal_sign', params: [ message, this.account.value ] });
  }

  handleAccountChange(accounts: Array<string>) {
    console.log("Changed", accounts);
    if (accounts.length < 0) {
      this.account.next("")
      this.connected.next(false)
      return;
    }
    this.account.next(accounts[0])
    this.signer = this.provider!.getSigner()
    this.connected.next(true)
  }

  handleChainChange(chainId: number) {
    console.log("Chain changed to", chainId)
  }

  handleDisconnect(error: ProviderRpcError) {
    this.account.next("")
    this.connected.next(false)
  }

  async tokensLeft(id: Number) {
    const provider = new ethers.providers.Web3Provider(this.ethereum);
    const signer = provider.getSigner()
    const escrow = new ethers.Contract(environment.escrowAddress, TokenFactory.abi, signer);

    return await escrow.tokensLeft(id);
  }

  async buyToken(id: Number, tokens: Number) {

    const escrow = new ethers.Contract(environment.escrowAddress, TokenFactory.abi, this.signer!);
    const token = new ethers.Contract(environment.tokenAddress, TestToken.abi, this.signer!);

    // Get signed message
    if (!this.connected.value) {
        await this.connectAsync()
    }

    // approve optional
    let property = await escrow.getProperty(id);
    let price = property.pricePer.toNumber()
    await token.approve(escrow.address, price)

    escrow.buyToken(id, tokens)
        .then(() => {
            console.log("Got it working")
        })
        // @ts-ignore
        .catch((err) => {
            console.log(err.message)
        });

  }

  constructor() { 
    // @ts-ignore
    this.ethereum = window['ethereum'];
    this.account = new BehaviorSubject("")
    this.connected.next(false);
    if (typeof this.ethereum === 'undefined') {
      console.log('MetaMask is not installed!');
    }
    if (this.ethereum._state.account !== undefined) {
        this.handleAccountChange(this.ethereum._state.account)
    }

    this.ethereum.on('disconnect', (error: ProviderRpcError) => this.handleDisconnect(error));
    this.ethereum.on('accountsChanged', (accs: Array<string>) => this.handleAccountChange(accs))
    this.ethereum.on('chainChanged', (chainId: number) => this.handleChainChange(chainId))
    // this.ethereum.on('message', this.handleMessage());
  }

}

