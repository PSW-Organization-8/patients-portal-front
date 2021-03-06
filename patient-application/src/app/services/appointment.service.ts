import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { serverPort } from '../app.consts';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
  export class AppointmentService {
    private _url = serverPort;
    currentAppointmentId:number = 0;

    constructor(private http: HttpClient, private router:Router) {}

    public cancelAppointment(appointmentId: any) {
      return this.http.put<any>(this._url + 'appointment/' + appointmentId, appointmentId);
    }

    public surveyAppointment(){
      return this.http.put<any>(this._url + 'appointment/survey/' + this.currentAppointmentId, this.currentAppointmentId);
    }

    public setCurrentAppointment(appointmentId: number){
      this.currentAppointmentId = appointmentId;
    }
  }