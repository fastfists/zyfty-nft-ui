import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class DetailsService {

  constructor(private http: HttpClient) { }

  nftData(id: any) {
    return this.http.get(environment.apiUrl + `nft/${id}` );
  }
}
