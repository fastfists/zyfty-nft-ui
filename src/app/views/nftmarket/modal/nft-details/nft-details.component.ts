import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {nftmarketService} from "../../nftmarket.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-nft-details',
  templateUrl: './nft-details.component.html',
  styleUrls: ['./nft-details.component.scss']
})
export class NftDetailsComponent {
  selectedNftDetails: any;
  lat: any;
  lng: any;
  zoom: number = 4;

  constructor(private activeModal: NgbActiveModal, private nftmarketService: nftmarketService, private router: Router) {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  setSelectedNftDetails(selectedNftDetails: any): void {

    this.nftmarketService.nftById(selectedNftDetails.id).subscribe(
      (data) => {
        this.selectedNftDetails = data
        this.getCurrentPosition(this.selectedNftDetails.address);
      },
      (err) => {
        console.log('Success', err)
      }
    );
  }

  getCurrentPosition(searchTerm: any) {
    this.nftmarketService.currentPosition(searchTerm).subscribe((data: any) => {
        if (data.results.length > 0) {
          let location = data.results[0].geometry.location;
          this.lng = location.lng;
          this.lat = location.lat;
        } else {
          this.getCurrentPosition(this.selectedNftDetails.zip)
        }
      },
      (err) => {
        console.log('Success', err)
      });
  }


  isLogin(id: any) {
    let isLogin = localStorage.getItem('user')
    if (isLogin) {
      console.log('Already login::')
    } else {
      this.closeModal();
      localStorage.setItem('buyNowUrl', '/marketplace/details/' + id)
      this.router.navigate(['/user/signin'])
    }
  }
}
