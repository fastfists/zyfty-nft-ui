import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { registrationService } from "./registration.service";
import { ToastrService } from 'ngx-toastr';
import { successMassage } from 'src/app/common-service/toastr/toastr-message.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: UntypedFormGroup;
  loading = false;
  submitted = false;
  isSignup = false;

  constructor(private formBuilder: UntypedFormBuilder,
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
          this.router.navigate(['/user/signin'])
          this.toastr.success(successMassage.verifyEmailSend);
        },
        (err) => {
          this.toastr.error(err.error);
        });
  }

}
