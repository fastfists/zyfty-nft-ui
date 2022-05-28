import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';

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
    private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      localStorage.setItem('resetToken', params.token)
    })
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
    let token = localStorage.getItem('resetToken')

    this.resetPasswordService.resetPassword({ password: this.resetForm.controls['password'].value, token: token })
      .subscribe(
        res => {
          this.router.navigate(['/user/signin'])
          localStorage.removeItem('resetToken');
          this.loading = false;
        },
        (err) => {
          console.log('Error', err)
        });
  }
}

