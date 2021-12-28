import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { serverPort } from '../app.consts';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
  export class LoginService {
    private _url = serverPort;
    constructor(private http: HttpClient, private router:Router) {}

    public getLoggedUserFromServer(token:any): Observable<any> {
        return this.http.get<any>(this._url + 'patient/login');
    }

    public sendLoginFormToServer(username: any, password: any) {
        let loginForm = {
            username: username,
            password: password,
          };

          let params = new HttpParams()
            .append('username', username)
            .append('password', password)
          return this.http.post<any>(this._url + 'login', loginForm);
    }
}