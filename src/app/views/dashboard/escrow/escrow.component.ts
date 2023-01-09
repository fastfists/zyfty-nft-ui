import { Component, OnInit } from '@angular/core';
import { EscrowService } from 'src/app/common-service/contracts/escrow.service';
import { nftmarketService } from '../../nftmarket/nftmarket.service';

type escrow = {
  id: number;
  isOpen: boolean;
  status: string;
  tokensLeft: number;
  tokensOwed: number;
}

@Component({
  selector: 'app-escrow',
  templateUrl: './escrow.component.html',
})
export class EscrowComponent implements OnInit {

  escrows: escrow[] = [];
  items: any = [];

  constructor(public escrow: EscrowService, private marketService: nftmarketService) {
  }

  ngOnInit(): void {
    this.marketService.nftItems().subscribe(
      (data) => {
        console.log(data)
        this.items = data
      },
      (error) => {
        console.log("Bad", error);
      }
    );
  }

}
