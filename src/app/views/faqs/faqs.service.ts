import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FaqsService {
  constructor(private http: HttpClient) {}
  
  saveWhp(formData: any) {
    return this.http.post(
      environment.apiUrl + 'whitepaperRequest/save',
      formData
    );
  }
}
