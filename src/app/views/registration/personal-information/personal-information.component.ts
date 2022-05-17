import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalInformationService } from './personal-information.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {

  personalInfo!: FormGroup;
  submitted: Boolean = false;

  constructor(private personalInformationService: PersonalInformationService) { }

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
    }
  }

}
