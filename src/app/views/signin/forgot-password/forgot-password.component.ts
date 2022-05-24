import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgotForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.loading = true;

    // stop here if form is invalid
    if (this.forgotForm.invalid) {
      return;
    }
    localStorage.setItem('user', this.f.email.value)

    // this.signinService.login(this.forgotForm.value)
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
