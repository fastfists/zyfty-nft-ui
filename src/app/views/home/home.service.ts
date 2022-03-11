import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) {}

  saveNft(formData: any) {
    return this.http.post(
      environment.apiUrl + 'nftRequest/save',
      formData
    );
   }

  saveWhp(formData: any) {
    return this.http.post(
      environment.apiUrl + 'whitepaperRequest/save',
      formData
    );
  }
}
