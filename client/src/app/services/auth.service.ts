import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userLogged: BehaviorSubject<User> = new BehaviorSubject<User>(null);


  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(private http: HttpClient) { }

  registerUser(name: string, email: string, password: string) {
    const url_api = 'http://localhost:8080/user/register';
    return this.http.post<User>(
      url_api,
      {
        name: name,
        email: email,
        password: password
      },
      {headers: this.headers}
    ).pipe(map(data => data));
  }

  loginUser(email: string, password: string): Observable<User> {
    const url_api = 'http://localhost:8080/user/login';

    return this.http.post<User>(
      url_api,
      { email, password },
      { headers: this.headers }
    ).pipe(map(data => data));
  }

  setUser(user: User): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
  }

  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  getCurrentUser(): User {
    let user_string = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(user_string)) {
      let user: User = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }


}
