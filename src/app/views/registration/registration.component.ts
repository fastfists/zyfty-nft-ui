import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { registrationService } from "./registration.service";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  loading = false;
  submitted = false;
  isSignup = false;

  constructor(private formBuilder: FormBuilder,
    private registrationService: registrationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  private emitter: any;
  get f() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }
    this.loading = true;
    this.router.navigate(['/signin'])
    // this.router.navigate(['/registration-details'])
    // @ts-ignore
    //   this.registrationService.registration(this.registrationForm.value)
    //     .subscribe(
    //       res => {
    //         return res;
    //       },
    //       (err) => {
    //         console.log('Success', err)
    //       });
  }

}
