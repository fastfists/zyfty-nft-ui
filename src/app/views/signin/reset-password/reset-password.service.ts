import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(
    private http: HttpClient
  ) { }

  resetPassword(formData: any) {
    return this.http.put(
      environment.apiUrl + 'user/new-password',
      formData
    );
  }
}
