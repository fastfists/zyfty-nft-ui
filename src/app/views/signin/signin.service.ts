import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class signinService {
  userValue: any;

  constructor(private router: Router, private http: HttpClient) {
  }

  private env = environment;
  private URL = this.env.apiUrl;


  login(email: any, password: any) {
    console.log(email, password);
  }

}

