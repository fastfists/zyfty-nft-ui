import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  verifyPassword() {
    if (this.resetForm.controls['confirmPassword'].value === this.resetForm.controls['password'].value) {
      this.f.confirmPassword.setErrors(null);
    } else {
      this.f.confirmPassword.setErrors({ mismatch: true });
    }
  }

  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    console.log(this.resetForm.value);
    // this.signinService.login(this.loginForm.value)
    //   .subscribe(
    //     res => {
    //       this.router.navigate(['/registration-details'])
    //       this.loading = false;
    //     },
    //     (err) => {
    //       console.log('Error', err)
    //     });
  }
}

