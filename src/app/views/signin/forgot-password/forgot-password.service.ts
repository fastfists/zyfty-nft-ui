import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(
    private http: HttpClient
  ) { }

  forgotPassword(formData: any) {
    return this.http.put(
      environment.apiUrl + 'user/forgot-password',
      formData
    );
  }
}
