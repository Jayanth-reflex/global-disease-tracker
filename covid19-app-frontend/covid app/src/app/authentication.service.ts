import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}
// Provide username and password for authentication, and once authentication is successful, 
//store JWT token in session
  authenticate(username : string, password: string) {
    return this.httpClient
      .post<any>("http://localhost:8400/auth/login", { userName : username, password : password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    return !(user === null);
  }

  
  getUsername(): any {
    if(this.isUserLoggedIn())
      return sessionStorage.getItem('username');
  }
}