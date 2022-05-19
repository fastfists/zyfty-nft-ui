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
      firstName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      country: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      state: new FormControl(null, [Validators.required]),
      zip: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
      ssn: new FormControl(null, [Validators.required]),
      dob: new FormControl(null, [Validators.required])
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
      this.addNewItem('binal')
    }
  }

  addNewItem(value: string) {

    this.newItemEvent.emit(value);
  }

}
