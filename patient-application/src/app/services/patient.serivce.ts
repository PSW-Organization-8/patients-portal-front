import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { serverPort } from '../app.consts';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
  export class PatientService {
    private _url = serverPort;
    constructor(private http: HttpClient, private router:Router) {}

    public getPatientFromServer(patientId: string): any {
      return this.http.get<any>(this._url + 'patient/' + "1");
    }

    public getFreeDoctors() {
      return this.http.get<any>(this._url + 'doctor');
    }

    public getAllergens() {
      return this.http.get<any>(this._url + 'allergen');
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
        //Allergens: selectedAllergens,
        Doctor: doctor,
        IsActivated: false,
      };
      return this.http.post<any>(this._url + 'patient', patient).subscribe( () => {
        this.router.navigate(['']);
        }
      );
    }
  }