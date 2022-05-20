import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class registrationService {


  constructor(private router: Router, private http: HttpClient) {
  }

  private env = environment;
  private URL = this.env.apiUrl;


  registration(data: any) {
    return this.http.post(`${environment.apiUrl}user/register`, data)
      .pipe(
        tap(() => console.log('registration'))
      )
  }

}

