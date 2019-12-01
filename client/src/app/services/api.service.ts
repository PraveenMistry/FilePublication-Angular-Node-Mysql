import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Paper } from '../models/Paper';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public token = localStorage.getItem('accessToken');
  public papers : Paper;

  // headers: HttpHeaders = new HttpHeaders({
  //   "Content-Type": "application/json",
  //   "Authorization": localStorage.getItem('accessToken')
  // });

  getCustomHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage.getItem('accessToken'));
    return headers;
  }

  constructor(private http: HttpClient) { }

  getFiles(): Observable<any> {
    const url_api = 'http://localhost:8080/file/get';
    console.log("headers",this.getCustomHeaders());
    return this.http.get<Paper>(
      url_api,
      {headers: this.getCustomHeaders()}
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
      {headers: this.getCustomHeaders()}
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
      {headers: this.getCustomHeaders()}
    ).pipe(map(data => data));
  }

  deleteFile(paperId): Observable<any> {
    const url_api = 'http://localhost:8080/file/delete/'+paperId;
    return this.http.delete<Paper>(
      url_api,
      {headers: this.getCustomHeaders()}
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
