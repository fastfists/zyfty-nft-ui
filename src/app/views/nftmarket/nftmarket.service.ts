import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class nftmarketService {
  constructor(private http: HttpClient) {
  }

  private env = environment;
  private URL = this.env.apiUrl;

  nftItems() {
    return this.http.get(this.URL + 'nft/list', {  })
      .pipe(
        tap(() => console.log('nftItem'))
      )
  }

  nftById(id: any) {
    return this.http.get(environment.apiUrl + `nft/${id}` );
  }
}
