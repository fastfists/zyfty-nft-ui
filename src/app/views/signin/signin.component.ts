import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { signinService } from "./signin.service";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth-guard/auth.service';

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

  constructor(private formBuilder: FormBuilder,
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
            this.toastr.success('Your email has been verified sucessfully!');
          },
          () => {
            this.toastr.error('Something went wrong please try after sometime!');
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
            // this.router.navigate(['/registration-details'])
          }
          this.loading = false;
          this.toastr.success('Login sucessfully!');
        },
        (err) => {
          localStorage.removeItem('user');
          this.toastr.error('Something went wrong please try after sometime!');
        });
  }


}
