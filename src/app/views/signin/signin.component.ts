import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { signinService } from "./signin.service";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  private error: any;
  isLogin = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private signinService: signinService,
    private router: Router) {
    // redirect to home if already logged in
    if (this.signinService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  verify() {
    this.isLogin = true;
    this.loading = false;
  }

  onSubmit() {
    this.submitted = true;

    this.loading = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // this.signinService.login(this.f.email.value, this.f.password.value)
    if (this.isLogin) {
      this.router.navigate(['/registration-details'])
      this.loading = false;
    }
  }


}
