import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import { Paper } from '../models/Paper';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userLogged: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public token = localStorage.getItem('accessToken');
  public papers : Paper;

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization":this.token
  });

  constructor(private http: HttpClient) { }

  getFiles(): Observable<any> {
    const url_api = 'http://localhost:8080/file/get';
    return this.http.get<Paper>(
      url_api,
      {headers: this.headers}
    ).pipe(map(data => data));
  }

  getPublicFiles(): Observable<any> {
    const url_api = 'http://localhost:8080/file/public';
    return this.http.get<Paper>(
      url_api
    ).pipe(map(data => data));
  }

  getPaperById(paperId): Observable<any> {
    const url_api = 'http://localhost:8080/file/get/'+paperId;
    return this.http.get<Paper>(
      url_api,
      {headers: this.headers}
    ).pipe(map(data => data));
  }

  updatePaper(paperData): Observable<any> {
    const paperId = localStorage.getItem('paperId')
    var accessible = paperData.accessible;
    const url_api = 'http://localhost:8080/file/update/'+paperId;
    return this.http.put<Paper>(
      url_api,{
        accessible
      },
      {headers: this.headers}
    ).pipe(map(data => data));
  }

  deleteFile(paperId): Observable<any> {
    const url_api = 'http://localhost:8080/file/delete/'+paperId;
    return this.http.delete<Paper>(
      url_api,
      {headers: this.headers}
    ).pipe(map(data => data));
  }

  getFileByName(name): Observable<any>{
    const url_api = 'http://localhost:8080/public/getFileByName/'+name;
    return this.http.get<Paper>(
      url_api
    ).pipe(map(data => data));
  }

  isFileExists(name): Observable<any>{
    const url_api = 'http://localhost:8080/public/isFileExists/'+name;
    return this.http.get<Paper>(
      url_api
    ).pipe(map(data => data));
  }




}
