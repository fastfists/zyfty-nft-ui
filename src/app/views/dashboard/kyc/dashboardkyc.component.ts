import { Component, OnInit } from '@angular/core';
import { KYCService } from 'src/app/common-service/contracts/kyc.service';

@Component({
  selector: 'app-dashboardkyc',
  templateUrl: './dashboardkyc.component.html',
})
export class DashboardkycComponent implements OnInit {

  constructor(private kyc: KYCService) { }

  verified: Boolean = false;
  verifiedStr = () => this.verified ? "Verified" : "Not Verified";

  ngOnInit(): void {
    this.kyc.isVerified().then((verified) => {
      this.verified = verified;
    });
  }

}
