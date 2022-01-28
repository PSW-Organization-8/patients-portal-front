import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { serverPort } from '../app.consts';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  export class LoginService {
    private _url = serverPort;
    constructor(private http: HttpClient, private router:Router) {}

    public getLoggedUserFromServer(token:any): Observable<any> {
      let result = token.slice(1,-1);
      let header = new HttpHeaders().set("Authorization", 'Bearer ' + result);
        return this.http.get<any>(this._url + 'patient/login', {headers:header});
    }

    public sendLoginFormToServer(username: any, password: any) {
        let loginForm = {
            username: username,
            password: password,
          };
          return this.http.post<any>(this._url + 'login', loginForm);
    }
}