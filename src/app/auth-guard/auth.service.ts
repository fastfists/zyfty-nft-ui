import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user';

interface login {
  userName: string,
  id: string,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  userData: any;
  // returnUrl!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser") || "{}")
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private env = environment;
  private URL = this.env.apiUrl;

  login(data: any): Observable<login> {
    // this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    return this.http.post<login>(
      environment.apiUrl + 'authenticate', data
    )
      .pipe(
        map((user) => {
          this.userData = user;
          if (user) {
            console.log('user :::', user.token)
            localStorage.setItem("currentUser", JSON.stringify(user));
            localStorage.setItem("token", user.token);
            this.currentUserSubject.next(this.userData);
            let userData = localStorage.getItem("currentUser");
            console.log("userDAta :: ", userData);
            this.router.navigateByUrl("/user/signin");
          }
          return user
        })
      );
  }

  verifyUser(token: any) {
    return this.http.put(
      environment.apiUrl + 'user/verify', token
    );
  }
}
