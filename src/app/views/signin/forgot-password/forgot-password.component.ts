import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from './forgot-password.service';

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
    private formBuilder: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]]
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
    localStorage.setItem('user', this.f.userName.value)

    this.forgotPasswordService.forgotPassword(this.forgotForm.value)
      .subscribe(
        res => {
          this.router.navigate(['/signin'])
          this.loading = false;
        },
        (err) => {
          console.log('Error', err)
        });
  }

}
