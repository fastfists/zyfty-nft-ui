import {Component, Input, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {

  closeModal: string | undefined;

  constructor(private modalService: NgbModal) {}

  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  ngOnInit() {
  }

  mpItmes = [
    {img: "assets/images/marketplace/nft-mp-1.png", name:"San Diego, 92109" },
    {img: "assets/images/marketplace/nft-mp-1.png", name:"San Diego, 92109" },
    {img: "assets/images/marketplace/nft-mp-1.png", name:"San Diego, 92109" },
  ];

  slides = [
    {img: "assets/images/marketplace/nft-mp-1.png", name:"San Diego, 92109" },
    {img: "assets/images/marketplace/nft-mp-1.png", name:"San Diego, 92109" },
    {img: "assets/images/marketplace/nft-mp-1.png", name:"San Diego, 92109" },
    {img: "assets/images/marketplace/nft-mp-1.png", name:"San Diego, 92109" },
    {img: "assets/images/marketplace/nft-mp-1.png", name:"San Diego, 92109" },
    {img: "assets/images/marketplace/nft-mp-1.png", name:"San Diego, 92109" },

  ];
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 1, "autoplay": true , cssEase: 'linear', "autoplaySpeed": 10, speed: 6000};

  addSlide() {
    {img: "assets/images/marketplace/nft-mp-1.png"}
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

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
