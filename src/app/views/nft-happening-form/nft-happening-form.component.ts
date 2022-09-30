import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { NftHappeningFormService } from './nft-happening-form.service';
import { ToastrService } from 'ngx-toastr';
import { errorMessage, successMassage } from 'src/app/common-service/toastr/toastr-message.service';

@Component({
  selector: 'app-nft-happening-form',
  templateUrl: './nft-happening-form.component.html',
  styleUrls: ['./nft-happening-form.component.scss']
})
export class NftHappeningFormComponent implements OnInit {

  submitted: boolean = false;
  reqSubmitted: boolean = false;
  emailForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private nftHappeningFormService: NftHappeningFormService,
              private toastr: ToastrService) { }


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
  }


  saveForm() {
    this.submitted = true;
    if (this.emailForm.valid) {
      this.nftHappeningFormService.saveNft(this.emailForm.value).subscribe(
        (data: any) => {
          this.toastr.success('Zyfty NFTs request has been submited sucessfully!');
        },
        () => {
          this.toastr.error(errorMessage.error);
        }
      );
      window.scroll(0, 0);
      this.submitted = false;
      this.emailForm.reset();
    }

  }

  stopPropagation(event: any) {
    event.stopPropagation();
  }
}
