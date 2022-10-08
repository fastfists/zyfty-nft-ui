import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NftDetailsComponent} from '../nftmarket/modal/nft-details/nft-details.component';
import {nftmarketService} from "./nftmarket.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-nftmarket',
  templateUrl: './nftmarket.component.html',
  styleUrls: ['./nftmarket.component.scss']
})
export class NftmarketComponent implements OnInit {

  nftItems: any = []
  searchText: any = "";
  isFetchingRecord: boolean = false;

  constructor(public modalService: NgbModal, private nftmarketService: nftmarketService, private http: HttpClient) {
  }

  openModal(selectedNft: any) {
    const modalRef = this.modalService.open(NftDetailsComponent, {size: 'xl', backdrop: 'static'})
    modalRef.componentInstance.setSelectedNftDetails(selectedNft);
  }


  ngOnInit(): void {
    this.getNftItems();
  }

  getNftItems() {
    this.isFetchingRecord = true;
    this.nftmarketService.nftItems().subscribe(
      (data) => {
        this.nftItems = data
        this.isFetchingRecord = false;
      },
      (err) => {
        console.log('Success', err)
      }
    );
  }

  getSearchText(searchText: any) {
    this.isFetchingRecord = true;
    this.nftmarketService.searchText(searchText).subscribe(
      (data) => {
        this.nftItems = data;
        this.isFetchingRecord = false;
      },
      (err) => {
        console.log('Success', err)
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
