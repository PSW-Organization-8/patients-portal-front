import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

    public sendSurveyToServer(values: Array<number>): void {
      let survey = {
        Values: values,
        PatientId: 1,
      };
      this.http.post<any>(this._url + 'survey', survey).subscribe( () => {
        this.router.navigate(['']);
      }
      );
    }
}