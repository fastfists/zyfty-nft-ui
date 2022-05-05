import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {marketplaceService} from "./marketplace.service";

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {

  mpItmes: any = {}

  constructor(private router: Router, private marketplaceService: marketplaceService) {
  }

  ngOnInit(): void {
    this.getMpItem(1)
  }

  getMpItem(id: any) {
    this.marketplaceService.mpItem().subscribe(
      (data) => {
        this.mpItmes = data
      },
      (err) => {
        console.log('Success', err)
      }
    );
  }

  fnDetails(fnDetails : any){
    this.router.navigate(['/marketplace/details/'+ fnDetails],
      {});
  }
}
