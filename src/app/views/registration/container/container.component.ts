import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  registrationType = 'personalInfo';

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(data: any) {
    this.registrationType = data;
  }

}
