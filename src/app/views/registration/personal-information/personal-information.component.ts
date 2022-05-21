import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter();

  personalInfo!: FormGroup;
  submitted: Boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.personalInfo = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      country: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.personalInfo.valid) {
      console.log('personalInfo ::', this.personalInfo.value)
      // this.personalInformationService.registration(this.personalInfo.value)
      //   .subscribe(res => {
      //     return res;
      //   })
      this.addNewItem('wallet')
    }
  }

  addNewItem(value: string) {

    this.newItemEvent.emit(value);
  }

}
