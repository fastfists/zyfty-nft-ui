import { Component, OnInit } from '@angular/core';
declare var $: any;
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AboutService } from './about.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  reqSubmitted: boolean = false;
  requestFormModel!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private aboutService : AboutService,
    private toastr : ToastrService) {}

  ngOnInit(): void {
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
  onRequestSubmit() {
    this.reqSubmitted = true;
    if (this.requestFormModel.valid) {
      this.aboutService.saveWhp(this.requestFormModel.value).subscribe(
        (data: any) => {
          this.toastr.success('White paper request has been submitted successfully!');
        },
        () => {
          this.toastr.error('Something went wrong please try after sometime!');
        }
      );
      window.scroll(0, 0);
      this.reqSubmitted = false;
      this.requestFormModel.reset();
    }
  }

  requestWhitePaperModal(event: any) {
    $(".form-popup").show();
    event.stopPropagation();
  }

  stopPropagation(event: any) {
    event.stopPropagation();
  }
}
