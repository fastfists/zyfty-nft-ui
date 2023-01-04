import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
@Injectable({
  providedIn: 'root' // just before your class
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("AccountComponent");
  }

}
