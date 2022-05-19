import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  @ViewChild("stepper1") stepper1!: ElementRef;

  ngAfterViewInit() {
    console.log(this.stepper1.nativeElement.value);
  }

  registrationType = 'personalInfo';

  constructor() { }

  ngOnInit(): void {
    // let test = this.stepper1.nativeElement.value
    // if (!test) {
    //   throw new Error("The element #portal wasn't found");
    // }
    // this.stepper = new Stepper(test, {
    //   linear: false,
    //   animation: true
    // })
  }

  onSelect(data: any) {
    this.registrationType = data;
  }

  addItem(data: any) {
    console.log('additem::', data)
  }

}
