import { Component, OnInit } from '@angular/core';
import {Lightbox} from "ngx-lightbox";
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

import { DetailsService } from './details.service';
import * as moment from 'moment';
import {ActivatedRoute} from "@angular/router";

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

  // get numImages(): number {
  //   return this.element.nativeElement.querySelectorAll('img').length;
  // }

  numArr = Array.from(Array(100), (_,x) => x);

  constructor(private _lightbox: Lightbox,
              private _detailsService: DetailsService,
              private modalService: NgbModal,
              private activeRoute: ActivatedRoute) {

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


  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      this.getNftData(id);
    });


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

