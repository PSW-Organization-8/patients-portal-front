import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverPort } from '../app.consts';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class StandardAppointmentService {
  private _url = serverPort;
  constructor(private _http: HttpClient, private _router:Router) { }

  public getSpecificDoctors(specialization : string) {
    return this._http.get<any>(this._url + 'doctor/spec/' + specialization);
  }

  public scheduleAppointment(appointment: any, token:any) {
    let result = token.slice(1,-1);
      let header = new HttpHeaders().set("Authorization", 'Bearer ' + result);
    return this._http.post<any>(this._url + 'appointment/createNew', appointment, {headers:header}).subscribe(
      () =>
      {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
    
        Toast.fire({
          icon: 'success',
          title: 'Successfully scheduling appointment.'
        })
         this._router.navigate(['record']);
      },
      () =>
      {
         Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'The doctor is busy at the chosen time.',
        })
      });
  } 

  public getFreeTerms(startTime: any, doctorId: any) {
    return this._http.get<any>(this._url + 'appointment/freeTerms?startTime=' + startTime + '&doctorId=' + doctorId);
  }
}
