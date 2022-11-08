import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class nftmarketService {
  constructor(private http: HttpClient) {
  }

  private env = environment;
  private URL = this.env.apiUrl;
  // private API_KEY = this.env.map_api_key;
  private API_KEY = "API_KEY"

  nftItems() {
    return this.http.get(this.URL + 'nft/list', {})
      .pipe(
        tap(() => console.log('nftItem'))
      )
  }

  nftById(id: any) {
    return this.http.get(environment.apiUrl + `nft/${id}`);
  }

  searchText(searchText: any) {
    return this.http.get(this.URL + 'nft/list?searchText=' + searchText);
  }

  currentPosition(position: any) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?key=` + this.API_KEY+ `=` + position);
  }
}
