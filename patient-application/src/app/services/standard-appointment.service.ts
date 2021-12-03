import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverPort } from '../app.consts';

@Injectable({
  providedIn: 'root'
})
export class StandardAppointmentService {
  private _url = serverPort;
  constructor(private _http: HttpClient) { }

  public getSpecificDoctors(specialization : string) {
    return this._http.get<any>(this._url + 'doctor/spec/' + specialization);
  }
}
