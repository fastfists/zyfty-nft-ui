import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class NftHappeningFormService {
  constructor(private http: HttpClient) {}

  saveNft(formData: any) {
    return this.http.post(
      environment.apiUrl + 'nftRequest/save',
      formData
    );
  }

}
