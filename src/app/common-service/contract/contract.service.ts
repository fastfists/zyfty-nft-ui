import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { ClientCtrl, ConfigCtrl, ConfigOptions, ModalCtrl } from '@web3modal/core'
// import { chains, providers } from '@web3modal/ethereum'

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  // private web3js: any; 
  // private provider: any;
  // private accounts: any;

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();

  constructor() {

//     const PROJECT_ID = "8e6b5ffdcbc9794bf9f4a1952578365b"

//     const clientConfig: ConfigOptions  = {
//       projectId: PROJECT_ID,
//       theme: 'dark',
//       accentColor: 'default'
//     }

//     const ethereumConfig = {
//       appName: 'web3Modal',
//       autoConnect: true,
//       chains: [chains.mainnet],
//       providers: [providers.walletConnectProvider({ projectId: PROJECT_ID })]
//     }

//     // Set up core and ethereum clients
//     ConfigCtrl.setConfig(clientConfig);
//     ClientCtrl.setEthereumClient(ethereumConfig);
  }

  async connect() {
    // ModalCtrl.open()
    // ModalCtrl.subscribe(state => {
    //   console.log("HI", state);
    // })
  }
}

