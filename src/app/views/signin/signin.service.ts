import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';

interface login {
  email: string,
  id: string
}
@Injectable({ providedIn: 'root' })
export class signinService {
  userValue: any;

  constructor(private router: Router, private http: HttpClient) {
  }

  private env = environment;
  private URL = this.env.apiUrl;


  login(data: any): Observable<login> {
    return this.http.put<login>(
      environment.apiUrl + 'user/signin', data
    );
  }

  verifyUser(token: any) {
    return this.http.put(
      environment.apiUrl + 'user/verify', token
    );
  }

}

