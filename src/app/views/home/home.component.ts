import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HomeService } from './home.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  submitted: boolean = false;
  reqSubmitted: boolean = false;
  emailForm!: FormGroup;
  requestFormModel!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private homeService : HomeService,
    private toastr : ToastrService) {}

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z ]+'),
      ]),
      email: new FormControl(
        '',
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ),
      hasPermission: new FormControl(),
      isInterested: new FormControl(),
    });

    this.requestFormModel = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z ]+'),
      ]),
      email: new FormControl(
        '',
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      )
    });
  }

  saveForm() {
    this.submitted = true;
    if (this.emailForm.valid) {
      this.homeService.saveNft(this.emailForm.value).subscribe(
        (data: any) => {
          this.toastr.success('Zyfty NFTs request has been submited sucessfully!');
        },
        () => {
          this.toastr.error('Something went wrong please try after sometime!');
        }
      );
      window.scroll(0, 0);
      this.submitted = false;
      this.emailForm.reset();
    }

  }

  onRequestSubmit() {
    this.reqSubmitted = true;
    if (this.requestFormModel.valid) {
      this.homeService.saveWhp(this.requestFormModel.value).subscribe(
        (data: any) => {
          this.toastr.success('White paper request has been submitted successfully!');
        },
        () => {
          this.toastr.error('Something went wrong please try after sometime!');
        }
      );
      this.reqSubmitted = false;
    }
  }
}
