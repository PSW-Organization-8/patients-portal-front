import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    public getAllDoctors() {
      return this.http.get<any>(this._url + 'doctor/allDoctors');
    }

    public getDatesByPriority(doctor?: any, firstDate?: any, lastDate?: any, priority?: any) {
      const params = new HttpParams()
        .set('firstDate', firstDate)
        .set('lastDate', lastDate)
        .set('doctorId', doctor.id)
        .set('priority', priority);
      return this.http.get<any>(this._url + 'appointment', {params});
    }
  }