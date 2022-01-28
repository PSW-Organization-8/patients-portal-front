import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { serverPort } from '../app.consts';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
  export class SurveyService {
    private _url = serverPort;
    constructor(private http: HttpClient, private router:Router) {}

    public getSurveyFromServer(): Observable<any> {
        return this.http.get<any>(this._url + 'survey');
    }

    public sendSurveyToServer(questions: Array<any>, patient:any, token:any): void {
      let survey = {
        PatientId: patient.id,
        Questions: questions
      };
      let result = token.slice(1,-1);
      let header = new HttpHeaders().set("Authorization", 'Bearer ' + result);
      this.http.post<any>(this._url + 'survey', survey, {headers:header}).subscribe( () => {
        this.router.navigate(['']);
      }
      );
    }
}