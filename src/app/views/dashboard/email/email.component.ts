import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WalletProvider } from 'src/app/common-service/provider/provider.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
})
export class EmailComponent implements OnInit {

  private url = environment.apiUrl;
  email: string = 'none';

  constructor(public http: HttpClient, public provider: WalletProvider, public toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.provider.account.subscribe((account) => {
      if (account != "") {
        this.http.get(this.url + 'user/email/' + account).subscribe((data: any) => {
          this.email = data.email;
        });
      }
    });
  }

  submitEmail() {
    this.provider.account.subscribe((account) => {
      if (account != "" && this.email != "none") {
        this.http.post(this.url + 'user/email', { address: account, email: this.email }).subscribe((data: any) => {
          this.toastr.success("Email updated successfully");
          console.log("response");
        });
      }
    });
  }

}
