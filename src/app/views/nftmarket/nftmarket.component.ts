import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NftDetailsComponent} from '../nftmarket/modal/nft-details/nft-details.component';
import {nftmarketService} from "./nftmarket.service";

@Component({
  selector: 'app-nftmarket',
  templateUrl: './nftmarket.component.html',
  styleUrls: ['./nftmarket.component.scss']
})
export class NftmarketComponent implements OnInit {

  nftItems: any = []
  searchText: any = "";

  constructor(public modalService: NgbModal, private nftmarketService: nftmarketService) {
  }

  openModal(selectedNft: any) {
    const modalRef = this.modalService.open(NftDetailsComponent, {size: 'xl', backdrop: 'static'})
    modalRef.componentInstance.setSelectedNftDetails(selectedNft);
  }

  ngOnInit() {
    this.getNftItems();
  }

  getNftItems() {
    this.nftmarketService.nftItems().subscribe(
      (data) => {
        this.nftItems = data
      },
      (err) => {
        console.log('Success', err)
      }
    );
  }

  getSearchText(searchText: any) {
    this.nftmarketService.searchText(searchText).subscribe(
      (data) => {
        this.nftItems = data
      },
      (err) => {
        console.log('Success', err)
      }
    );
  }

}
