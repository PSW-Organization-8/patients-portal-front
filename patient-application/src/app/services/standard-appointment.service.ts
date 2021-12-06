import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverPort } from '../app.consts';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StandardAppointmentService {
  private _url = serverPort;
  constructor(private _http: HttpClient, private _router:Router) { }

  public getSpecificDoctors(specialization : string) {
    return this._http.get<any>(this._url + 'doctor/spec/' + specialization);
  }

  public scheduleAppointment(appointment: any) {
    return this._http.post<any>(this._url + 'appointment', appointment).subscribe(
      () => { this._router.navigate(['record']); });
  } 

  public getFreeTerms(dayAndDoctor: any) {
    return this._http.post<any>(this._url + 'appointment/freeTerms', dayAndDoctor)
  }
}
