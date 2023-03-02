import { Injectable, InjectionToken, Inject } from '@angular/core';
import { providers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import { ethers } from 'ethers';

export const MetaMaskWeb3 = new InjectionToken<providers.BaseProvider>(
  'Metamask Provider',
  {
    providedIn: 'root',
    factory: () => (window as any).ethereum,
  }
);

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
  providedIn: 'root',
})
export class WalletProvider {
  account: BehaviorSubject<string> = new BehaviorSubject('');
  chain: BehaviorSubject<number> = new BehaviorSubject(0);
  connected = new BehaviorSubject(false);
  ethereum: any = null;

  provider: providers.Web3Provider | null = null;
  signer: BehaviorSubject<providers.JsonRpcSigner | null> =
    new BehaviorSubject<providers.JsonRpcSigner | null>(null);

  constructor() {
    // @ts-ignore
    this.ethereum = window['ethereum'];
    this.account = new BehaviorSubject('');
    this.connected.next(false);
    if (typeof this.ethereum !== 'undefined') {
      this.ethereum.on('disconnect', (error: ProviderRpcError) =>
        this.handleDisconnect(error)
      );
      this.ethereum.on('accountsChanged', (accs: Array<string>) =>
        this.handleAccountChange(accs)
      );
      this.ethereum.on('chainChanged', (chainId: number) =>
        this.handleChainChange(chainId)
      );
    }
  }

  connect() {
    if (typeof this.ethereum === 'undefined') {
      // TODO
      return false;
    }
    if (this.ethereum) {
      this.provider = new ethers.providers.Web3Provider(this.ethereum);
      this.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accs: Array<string>) => this.handleAccountChange(accs));
      return true;
    }
    return false;
  }

  disconnect() {
    if (this.ethereum) {
      this.provider = new ethers.providers.Web3Provider(this.ethereum);
      this.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accs: Array<string>) => this.handleAccountChange(accs));
    }
  }

  async signMessage(message: string) {
    return await this.ethereum.request({
      method: 'personal_sign',
      params: [message, this.account.value],
    });
  }

  handleAccountChange(accounts: Array<string>) {
    console.log('Changed', accounts);
    if (accounts.length < 0) {
      this.account.next('');
      this.connected.next(false);
      return;
    }
    this.account.next(accounts[0]);

    this.provider!.getNetwork().then((network) => {
      this.chain.next(network.chainId);
    });

    this.signer.next(this.provider!.getSigner());
    this.connected.next(true);
  }

  handleChainChange(chainId: number) {
    console.log('Chain changed to', chainId);
    this.chain.next(chainId);
  }

  handleDisconnect(error: ProviderRpcError) {
    this.account.next('');
    this.connected.next(false);
  }
}
