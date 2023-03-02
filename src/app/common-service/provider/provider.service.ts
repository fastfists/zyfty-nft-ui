import { Injectable, InjectionToken, Inject } from '@angular/core';
import { providers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import { ethers } from 'ethers';
import { I18NHtmlParser } from '@angular/compiler';

export const MetaMaskWeb3 = new InjectionToken<providers.BaseProvider>(
  'Metamask Provider',
  {
    providedIn: 'root',
    factory: () => (window as any).ethereum,
  }
);

type chain = `0x${string}`;

interface ProviderMessage {
  type: string;
  data: unknown;
}

interface AddEthereumChainParameter {
  chainId: chain; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
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
  chain: BehaviorSubject<string> = new BehaviorSubject('');
  connected = new BehaviorSubject(false);
  ethereum: any = null;

  chainInformation: {[chainId: chain]: AddEthereumChainParameter } = {
    "0x61": {
      chainName: "Binance Smart Chain Testnet",
      chainId: "0x61",
      nativeCurrency: {
        name: "Binance Coin",
        symbol: "tBNB",
        decimals: 18,
      },
      rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
      blockExplorerUrls: ["https://testnet.bscscan.com/"],
    }
  }


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
      this.ethereum.on('chainChanged', (chainId: chain) =>
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
    if (accounts.length < 0) {
      this.account.next('');
      this.connected.next(false);
      return;
    }
    this.account.next(accounts[0]);

    this.provider!.getNetwork().then((network) => {
      console.log("net", network);
      console.log("hex", ethers.utils.hexlify([network.chainId]))
      // @ts-ignore
      this.handleChainChange(ethers.utils.hexlify([network.chainId]));
    });

    this.signer.next(this.provider!.getSigner());
    this.connected.next(true);
  }

  handleChainChange(chainId: chain) {
    this.chain.next(chainId);
    if (chainId in this.chainInformation) {
      return;
    }
    const newChainId: chain = "0x61";
    const chosenChain = this.chainInformation[newChainId];
    // // add
    // this.ethereum.request({
    //   method: 'wallet_addEthereumChain',
    //   params: [chosenChain],
    // });

    // switch
    this.ethereum.request({
      method: 'wallet_switchEthereumChain', params: [
        { chainId: newChainId },
      ]
    }).catch((error: ProviderRpcError) => {
      if (error.code === 4902) {
        // add
        this.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [chosenChain],
        });
      }
    });
  }

  handleDisconnect(error: ProviderRpcError) {
    this.account.next('');
    this.connected.next(false);
  }
}
