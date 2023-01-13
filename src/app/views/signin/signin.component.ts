import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { signinService } from "./signin.service";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth-guard/auth.service';
import { errorMessage, successMassage } from 'src/app/common-service/toastr/toastr-message.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  private error: any;

  constructor(private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private signinService: signinService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
    // redirect to home if already logged in
    if (this.signinService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.token) {
        this.authService.verifyUser({ token: params.token }).subscribe(
          (data: any) => {
            this.toastr.success(successMassage.mailVerified);
          },
          () => {
            this.toastr.error(errorMessage.verifyEmailError);
          }
        );
      } else {
        console.log('normal signin ::')
      }
    });
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    let buyNowUrl = localStorage.getItem('buyNowUrl')
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    // this.loading = true;
    this.authService.login(this.loginForm.value)
      .subscribe(
        (res) => {
          localStorage.setItem('user', res.userName)
          if (buyNowUrl) {
            this.router.navigate([buyNowUrl])
          } else {
            this.router.navigate(['/'])
            // this.router.navigate(['/user/registration-details'])
          }
          this.loading = false;
          this.toastr.success(successMassage.loginSuccess);
        },
        (err) => {
          localStorage.removeItem('user');
          this.toastr.error(errorMessage.loginError);
        });
  }


}
