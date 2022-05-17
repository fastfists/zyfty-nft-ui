import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

  constructor(private router: Router, private http: HttpClient) {
  }

  private env = environment;
  private URL = this.env.apiUrl;

  registration() {
    // return this.http.post(`${environment.apiUrl}registration`, {})
    //   .pipe(
    //     tap(() => console.log('registration'))
    //   )
  }
}
