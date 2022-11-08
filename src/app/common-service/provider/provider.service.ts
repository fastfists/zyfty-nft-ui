import { Injectable, InjectionToken, Inject } from '@angular/core';
import { providers } from 'ethers';
import { Subject } from 'rxjs';

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

  account: Subject<any> = new Subject()
  ethereum: any = null;

  connect() {
    if (typeof this.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
    if (this.ethereum) {
      this.ethereum.request({ method: 'eth_requestAccounts' })
      .then(this.handleAccountChange);
    }
  }

  handleAccountChange(accouonts: Array<string>) {
    // Set subjects
  }

  handleChainChange(chainId: number) {
    // Set subjects
  }

  handleDisconnect(error: ProviderRpcError) {
    // Set subjects
  }

  constructor() { 
    // @ts-ignore
    this.ethereum = window['ethereum'];
    if (typeof this.ethereum === 'undefined') {
      console.log('MetaMask is installed!');
    }
    this.ethereum.on('disconnect', this.handleDisconnect);
    this.ethereum.on('accountsChanged', this.handleAccountChange)
    this.ethereum.on('chainChanged', this.handleChainChange)
    // this.ethereum.on('message', this.handleMessage());
  }

}

