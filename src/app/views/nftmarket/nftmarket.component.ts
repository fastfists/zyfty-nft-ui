import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal';

@Component({
  selector: 'app-nftmarket',
  templateUrl: './nftmarket.component.html',
  styleUrls: ['./nftmarket.component.scss']
})
export class NftmarketComponent implements OnInit {

  bodyText: string | undefined;
  selectedNft: any;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
  }

  openModal(id: string, item : any) {
    this.modalService.open(id);
    this.selectedNft = item;
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  items =[{

      image: '../../assets/images/nftmarket/01/StreetView.jpg',
      name: 'San Diego Townhome',
      rate: '$500',
    images: [
      {
        url:'../../assets/images/nftmarket/01/1stFloorBedroom1.jpg',
      },
      {
        url:'../../assets/images/nftmarket/01/Kitchen.jpg',
      },
      {
        url:'../../assets/images/nftmarket/01/2ndFloorDeck1.jpg',
      },
      {
        url:'../../assets/images/nftmarket/01/1stFloorBedroom1.jpg',
      },
      {
        url:'../../assets/images/nftmarket/01/1stFloorBathroom.jpg',
      }      ,
      {
        url:'../../assets/images/nftmarket/01/MasterBathroom1.jpg',
      }      ,
      {
        url:'../../assets/images/nftmarket/01/1stFloorHallway.jpg',
      }
    ]
    },
    {
      image: '../../assets/images/nftmarket/02/AlleyEntrance.jpg',
      name: 'Walk to the Beach',
      rate: '$1000',
      images: [

        {
          url:'../../assets/images/nftmarket/02/1stFloorBedroom2_2.jpg',
        },
        {
          url:'../../assets/images/nftmarket/02/FrontDoor.jpg',
        },
        {
          url:'../../assets/images/nftmarket/02/1stFloorHallwayandEntrancetoLaundry.jpg',
        },
        {
          url:'../../assets/images/nftmarket/02/2ndFloorExerciseArea.jpg',
        }        ,
        {
          url:'../../assets/images/nftmarket/02/2ndFloorHalfBathroom.jpg',
        },
        {
          url:'../../assets/images/nftmarket/02/2ndFloorKitchenandLivingArea1.jpg',
        },
        {
          url:'../../assets/images/nftmarket/02/2ndFloorKitchenandLivingArea2.jpg',
        }
      ]
    },
    {
      image: '../../assets/images/nftmarket/03/ExteriorfromAlley.jpg',
      name: 'Pacific Beach Townhome',
      rate: '$1500',
      images: [
        {
          url:'../../assets/images/nftmarket/03/MasterBedroom2.jpg',
        },
        {
          url:'../../assets/images/nftmarket/03/MasterBedroom1.jpg',
        },
        {
          url:'../../assets/images/nftmarket/03/2ndFloorSouthView.jpg',
        },
        {
          url:'../../assets/images/nftmarket/03/2ndFloorSouthEastView.jpg',
        },
        {
          url:'../../assets/images/nftmarket/03/2ndFloorKitchenandLivingArea4.jpg',
        },
        {
          url:'../../assets/images/nftmarket/03/2ndFloorKitchenandLivingArea3.jpg',
        },
        {
          url:'../../assets/images/nftmarket/03/2ndFloorDeck3.jpg',
        },
        {
          url:'../../assets/images/nftmarket/03/2ndFloorDeck2.jpg',
        },
        {
          url:'../../assets/images/nftmarket/03/2ndFloorDeck1.jpg',
        }
      ]
    },
    {
      image: '../../assets/images/nftmarket/04/2ndFloorSouthEastView.jpg',
      name: 'San Diego Near the Beach',
      rate: '$2000',
      images: [

        {
          url:'../../assets/images/nftmarket/04/2ndFloorKitchenandLivingArea6.jpg',
        },
        {
          url:'../../assets/images/nftmarket/04/2ndFloorSouthEastView.jpg',
        },
        {
          url:'../../assets/images/nftmarket/04/2ndFloorSouthWestView.jpg',
        },
        {
          url:'../../assets/images/nftmarket/04/2ndFloorKitchenandLivingArea1.jpg',
        },
        {
          url:'../../assets/images/nftmarket/04/MasterBedroom3.jpg',
        },
        {
          url:'../../assets/images/nftmarket/04/StairwaytoEntrance.jpg',
        },
        {
          url:'../../assets/images/nftmarket/04/StreetEntranceWalkway.jpg',
        },
        {
          url:'../../assets/images/nftmarket/04/MasterBathroom2.jpg',
        },
        {
          url:'../../assets/images/nftmarket/04/Entrance.jpg',
        }
      ]
    }]


}
