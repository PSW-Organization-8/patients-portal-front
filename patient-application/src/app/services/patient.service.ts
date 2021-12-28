import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { serverPort } from '../app.consts';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  export class PatientService {
    private _url = serverPort;
    constructor(private http: HttpClient, private router:Router) {}

    public getPatientFromServer(patientId: number): any {
      return this.http.get<any>(this._url + 'patient/' + patientId);
    }

    public getFreeDoctors() {
      return this.http.get<any>(this._url + 'doctor');
    }

    public getAllergens() {
      return this.http.get<any>(this._url + 'allergen');
    }

    public getPatientAppointments(patientId: number) {
      let token = localStorage.getItem("token")
      if(token ==null)
        token=""
      let result = token.slice(1,-1);
      let header = new HttpHeaders().set("Authorization", 'Bearer ' + result);
      return this.http.get<any>(this._url + 'appointment/' + patientId, {headers:header});
    }

    public registerPatient(name:string, lastName:string, username:string, password:string, jmbg:string, email:string, phone:string, selectedAllergens:any, dateOfBirth:string, bloodType:string, country:string, city:string, address: string, doctor: any){
      let patient = {
        Name: name,
        LastName: lastName,
        Jmbg: jmbg,
        Username: username,
        Password: password,
        Email: email,
        Phone: phone,
        DateOfBirth: dateOfBirth,
        Country: country,
        City: city,
        Address: address,
        BloodType: bloodType,
        Allergens: selectedAllergens,
        DoctorId: doctor.id,
        IsActivated: false,
      };
      return this.http.post<any>(this._url + 'patient', patient).subscribe( () => {
        this.router.navigate(['']);
        }
      );
    }
  }