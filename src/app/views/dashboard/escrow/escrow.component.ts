import { Component, OnInit } from '@angular/core';
import { EscrowService } from 'src/app/common-service/contracts/escrow.service';
import { nftmarketService } from '../../nftmarket/nftmarket.service';

type escrow = {
  id?: number;
  isOpen?: boolean;
  status?: string;
  tokensLeft?: number;
  tokensOwed?: number;
  percentage: number;
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
        this.items = data
      },
      (error) => {
        console.log("Bad", error);
      }
    );
    let p = Promise.all([this.escrow.tokensLeft(1), this.escrow.tokensLeft(2), this.escrow.tokensLeft(3), this.escrow.tokensLeft(4),
                        this.escrow.getTokens(1), this.escrow.getTokens(2), this.escrow.getTokens(3), this.escrow.getTokens(4)])
    p.then((data) => {
      console.log("Got status", data)
      for (let i = 0; i < 4; i ++) {
        let tokensLeft = data[i];
        let tokens = data[i + 4];
        let percentage = ((400-tokensLeft) / 400)*100;

        this.escrows.push({
          id: i + 1,
          isOpen: true,
          status: "Open",
          tokensLeft: tokensLeft,
          tokensOwed: tokens,
          percentage
        })
      }
    })
  }
}
