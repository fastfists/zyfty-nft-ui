import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NftDetailsComponent} from '../nftmarket/modal/nft-details/nft-details.component';
import {nftmarketService} from "./nftmarket.service";
import {HttpClient} from "@angular/common/http";
import { EscrowService } from 'src/app/common-service/contracts/escrow.service';
import { KYCService } from 'src/app/common-service/contracts/kyc.service';

@Component({
  selector: 'app-nftmarket',
  templateUrl: './nftmarket.component.html',
  styleUrls: ['./nftmarket.component.scss']
})
export class NftmarketComponent implements OnInit {

  nftItems: any = []
  chainNFT: any = []
  searchText: any = "";
  verified: boolean = false;
  isFetchingRecord: boolean = false;

  constructor(public modalService: NgbModal, private nftmarketService: nftmarketService, private http: HttpClient, private escrow: EscrowService, private kyc: KYCService) {
  }

  openModal(selectedNft: any) {
    const modalRef = this.modalService.open(NftDetailsComponent, {size: 'xl', backdrop: 'static'})
    modalRef.componentInstance.setSelectedNftDetails(selectedNft);
  }


  ngOnInit(): void {
    this.getNftItems();
  }

  getCosts() {
      this.escrow.getCosts().then((data) => {
          if (data != null) {
              console.log("ChainDaata", data);
              this.chainNFT = data;
          }
      })
  }

  checkVerification() {
    this.kyc.isVerified().then((status) => {
      console.log("Got status", status)
      this.verified = status;
    })
  }

  getNftItems() {
    this.escrow.signer$.subscribe((signer) => {
        if (signer != null) {
            console.log("Signer is non null");
            this.getCosts();
            this.checkVerification();
        }
    })

    this.isFetchingRecord = true;
    this.nftmarketService.nftItems().subscribe(
      (data) => {
        console.log("Got items", data);
        this.nftItems = data
        this.isFetchingRecord = false;
      },
      (err) => {
        console.log('Bad', err)
      }
    );
  }

  tokensLeft(id: any) {
      this.escrow.tokensLeft(id)
      .then((val) => {
        this.nftItems[id - 1].tokensLeft = val;
      });
  }

  getSearchText(searchText: any) {
    this.isFetchingRecord = true;
    this.nftmarketService.searchText(searchText).subscribe(
      (data) => {
        this.nftItems = data;
        this.isFetchingRecord = false;
      },
      (err) => {
        console.log('Bad', err)
      }
    );
  }

  resetSearch(searchText: any) {
    console.log(searchText)
    if(searchText == undefined || searchText == null) {
      this.getNftItems();
    }
  }
}
