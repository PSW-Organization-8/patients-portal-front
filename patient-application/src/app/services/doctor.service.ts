import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverPort } from '../app.consts';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
  export class DoctorService {
    private _url = serverPort;
    constructor(private http: HttpClient, private router:Router) {}

    public getDoctorFromServer(doctorId: number): any {
      return this.http.get<any>(this._url + 'doctor/' + doctorId);
    }
  }