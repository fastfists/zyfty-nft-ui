import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {nftmarketService} from "../../nftmarket.service";
import {Router} from "@angular/router";
import {Lightbox} from "ngx-lightbox";


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
  quntity: number = 1;

  public _albums: Array<any> = [];

  constructor(private _lightbox: Lightbox, private activeModal: NgbActiveModal, private nftmarketService: nftmarketService, private router: Router) {
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

  openImage(): void {
    // open lightbox imageList
    for (let i = 0; i < this.selectedNftDetails.imageList.length; i++) {
      const src = this.selectedNftDetails.imageList[i].nftImage;
      const thumb = this.selectedNftDetails.imageList[i].nftImage;
      const _albums = {
        src: src,
        thumb: thumb
      };
      this._albums.push(_albums);
    }
    this._lightbox.open(this._albums, 0, {
      wrapAround: true,
      showImageNumberLabel: true,
      disableScrolling: false,
      showZoom: true,
      showRotate: true
    });
  }

  close(): void {
    this._lightbox.close();
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

  gtyUpdate(isUpdate: boolean){
    if (isUpdate) {
        this.quntity = this.quntity + 1;
    }
    else if (this.quntity > 1 && !isUpdate){
      this.quntity = this.quntity - 1;
    }
  }

}
