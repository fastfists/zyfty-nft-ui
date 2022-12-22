import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { PersonalInformationService } from './personal-information.service';
import { countries } from 'src/app/common-service/countries/countries';
@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter();

  personalInfo!: FormGroup;
  submitted: Boolean = false;
  countries = countries;

  constructor(
    private personalInformationService: PersonalInformationService
  ) { }

  ngOnInit(): void {

    this.personalInfo = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.email]),
      country: new FormControl(null, [Validators.required]),
    });

    let userName = localStorage.getItem('user');
    this.personalInfo.controls['userName'].patchValue(userName);
  }

  onSubmit() {
    this.submitted = true;
    if (this.personalInfo.valid) {
      console.log('personalInfo ::', this.personalInfo.value)
      this.personalInformationService.personalInfo(this.personalInfo.value)
        .subscribe(res => {
          return res;
        })
      this.addNewItem('kyc')
    }
  }

  addNewItem(value: string) {

    this.newItemEvent.emit(value);
  }

}
