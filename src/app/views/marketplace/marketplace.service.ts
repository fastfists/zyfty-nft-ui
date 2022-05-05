import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class marketplaceService {
  constructor(private http: HttpClient) {
  }

  private env = environment;
  private URL = this.env.apiUrl;

  mpItem() {
    return this.http.get(this.URL + 'nft/list', {  })
      .pipe(
        tap(() => console.log('mpItem'))
      )
  }
}

