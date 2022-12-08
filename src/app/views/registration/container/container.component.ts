import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core'; // at top
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

@Injectable({
  providedIn: 'root' // just before your class
})
export class ContainerComponent implements OnInit {


  registrationType = 'kyc';
  // registrationType = 'personalInfo';
  walletFlag = true;
  kycFlag = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(data: any) {
    this.registrationType = data;
  }

  addItem(data: any) {
    if (data === 'wallet') {
      this.walletFlag = false;
      this.registrationType = data;
    } else if (data === 'kyc') {
      this.kycFlag = false;
      this.registrationType = data;
    } else {
      this.registrationType = data;
    }
  }

}
