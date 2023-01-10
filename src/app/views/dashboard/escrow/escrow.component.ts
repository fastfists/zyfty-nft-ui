import { Component, OnInit } from '@angular/core';
import { EscrowService } from 'src/app/common-service/contracts/escrow.service';
import { nftmarketService } from '../../nftmarket/nftmarket.service';

type escrow = {
  id?: number;
  isOpen?: boolean;
  status?: string;
  tokensLeft?: number;
  tokensOwed?: number;
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
    // let p = Promise.all([this.escrow.isOpen(1), this.escrow.isOpen(2), this.escrow.isOpen(3), this.escrow.isOpen(4)])
    let p = Promise.all([this.escrow.getTokens(1), this.escrow.getTokens(2), this.escrow.getTokens(3), this.escrow.getTokens(4)])
    p.then((data) => {
      console.log("Got status", data)
      this.escrows = data.map((tokens, i) => {
        return {
          id: i + 1,
          isOpen: false,
          status: "Open",
          tokensLeft: 500 - tokens,
          tokensOwed: tokens
        }
      })
    })
  }
}
