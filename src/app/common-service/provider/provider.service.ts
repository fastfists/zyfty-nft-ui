import { Injectable, InjectionToken, Inject } from '@angular/core';
import { providers } from 'ethers';
import { BehaviorSubject, Subject } from 'rxjs';

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

  connect() {
    if (typeof this.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
    if (this.ethereum) {
      this.ethereum.request({ method: 'eth_requestAccounts' })
          .then((accs: Array<string>) => this.handleAccountChange(accs));
      console.log("Made it here")
    }
  }

  handleAccountChange(accounts: Array<string>) {
    // Set subjects
    if (accounts.length < 0) {
      this.account.next("")
    }
    this.account.next(accounts[0])
    this.connected.next(true)
    console.log("I'm here", accounts[0])
  }

  handleChainChange(chainId: number) {
  }

  handleDisconnect(error: ProviderRpcError) {
    // Set subjects
  }

  constructor() { 
    // @ts-ignore
    this.ethereum = window['ethereum'];
    this.connected.next(false);
    if (typeof this.ethereum !== 'undefined') {
      console.log('MetaMask is not installed!');
    }
    this.ethereum.on('disconnect', this.handleDisconnect);
    this.ethereum.on('accountsChanged', this.handleAccountChange)
    this.ethereum.on('chainChanged', this.handleChainChange)
    // this.ethereum.on('message', this.handleMessage());
  }

}

