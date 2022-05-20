import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { signinService } from "./signin.service";
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    // redirect to home if already logged in
    if (this.signinService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      console.log('paramMap ::', params.token)
      if (params.token) {
        console.log('Verify email ::')
        this.verify();

        // this.signinService.verifyUser(params.token).subscribe(
        //   (data: any) => {
        //     this.toastr.success('Zyfty NFTs request has been submited sucessfully!');
        //   },
        //   () => {
        //     this.toastr.error('Something went wrong please try after sometime!');
        //   }
        // );
      } else {
        console.log('normal signin ::')
      }
    });
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

    this.signinService.login(this.f.email.value, this.f.password.value)
    if (this.isLogin) {
      this.router.navigate(['/registration-details'])
      this.loading = false;
    }
  }


}
