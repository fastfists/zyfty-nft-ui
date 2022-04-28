import { Component, OnInit } from '@angular/core';
import {Lightbox} from "ngx-lightbox";
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

import { DetailsService } from './details.service';
import * as moment from 'moment';
interface nft {
  auctionDate: String
}
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  modalOptions:NgbModalOptions;
  public _albums: Array<any> = [];

  nftData: any = {}
  moment= moment
  constructor(private _lightbox: Lightbox,
              private _detailsService: DetailsService,
              private modalService: NgbModal) {

    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    };
    for (let i = 1; i <= 4; i++) {
      const src = 'assets/images/marketplace/nft-mp-' + i + '.png';
      const thumb = 'assets/images/marketplace/nft-mp-' + i + '-thumb.png';
      const _albums = {
        src: src,
        thumb: thumb
      };
      //
      this._albums.push(_albums);
    }
    console.log("this._albums:::", this._albums);
  }

  openModel(modelData: any) {
    const modalRef = this.modalService.open(modelData);
    // modalRef.componentInstance.my_modal_title = 'I your title';
    // modalRef.componentInstance.my_modal_content = 'I am your content';
  }

  ngOnInit(): void {
    this.getNftData(1)
  }

  getNftData(id: any) {
    this._detailsService.nftData(id).subscribe(
      (data) => {
        console.log('NFT Success :: ', data)
        this.nftData = data
      },
      (err) => {
        console.log('NFT Success', err)
      }
    );
  }

    openImage(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index, {
      wrapAround: true,
      showImageNumberLabel: true,
      disableScrolling: false,
      showZoom: true,
      showRotate: true});
  }

  close(): void {
    this._lightbox.close();
  }

  slides = [
    {img: "assets/images/marketplace/nft-mp-1.png"},
    {img: "assets/images/marketplace/nft-mp-2.png"},
    {img: "assets/images/marketplace/nft-mp-3.png"},
    {img: "assets/images/marketplace/nft-mp-4.png"}
  ];

  slideConfig = {"slidesToShow": 3, "slidesToScroll": 1, "infinite": false, "autoplay": false , "autoplaySpeed": 10, speed: 2000};

  slickInit(e : any) {
    console.log('slick initialized');
  }

  breakpoint(e : any) {
    console.log('breakpoint');
  }

  afterChange(e : any) {
    console.log('afterChange');
  }

  beforeChange(e :  any) {
    console.log('beforeChange');
  }

}

