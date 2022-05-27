import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { registrationService } from "./registration.service";
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  get f() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    this.registrationService.registration(this.registrationForm.value)
      .subscribe(
        res => {
          this.loading = true;
          this.router.navigate(['/signin'])
          this.toastr.success('Register sucessfully!');
        },
        (err) => {
          this.toastr.error(err.error);
        });
  }

}
