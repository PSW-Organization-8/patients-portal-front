import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { serverPort } from '../app.consts';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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

    public getDatesByPriority(doctor: any, firstDate: any, lastDate: any, priority: any, token:any) {
      let advancedAppointmentDto = {
        firstDate: firstDate,
        lastDate: lastDate,
        doctorId: doctor.id,
        doctorPriority: priority,
      };
      let result = token.slice(1,-1);
      let header = new HttpHeaders().set("Authorization", 'Bearer ' + result);
      return this.http.get<any>(this._url + 'appointment', {params: advancedAppointmentDto, headers:header});
    }
  }