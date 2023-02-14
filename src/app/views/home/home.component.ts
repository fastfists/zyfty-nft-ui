import { Component, OnInit } from '@angular/core';
declare var $: any;
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  errorMessage,
  successMassage,
} from 'src/app/common-service/toastr/toastr-message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  submitted: boolean = false;
  reqSubmitted: boolean = false;
  emailForm!: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      name: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z ]+'),
      ]),
      email: new UntypedFormControl(
        '',
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ),
      hasPermission: new UntypedFormControl(),
      isInterested: new UntypedFormControl(),
    });
  }

  stopPropagation(event: any) {
    event.stopPropagation();
  }
}
