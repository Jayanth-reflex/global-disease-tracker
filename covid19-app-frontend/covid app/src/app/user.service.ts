import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class UserRegistrationRequest {
  constructor(
    public email : string,
    public password : string,
    public firstName : string,
    public lastName : string,
    public userName : string
  ) {}
}

export class PasswordResetRequest {
  constructor(
    public userName : string | null,
    public oldPassword : string,
    public newPassword : string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(private httpClient : HttpClient) { }

  public registerUser(user : UserRegistrationRequest) {
    return this.httpClient.post<UserRegistrationRequest>(
      "http://localhost:8400/auth/register",
      user
    );
  }

  getUser(username : string | null) {
    return this.httpClient.get<UserRegistrationRequest>("http://localhost:8400/auth/fetch/" + username);
  }

  public updateUser(user : UserRegistrationRequest) {
    return this.httpClient.put<UserRegistrationRequest>(
      "http://localhost:8400/auth/update",
      user
    );
  }

  public resetPassword(pwr : PasswordResetRequest) {
    return this.httpClient.put<any>(
      "http://localhost:8400/auth/resetPassword",
      pwr
    );
  }
}