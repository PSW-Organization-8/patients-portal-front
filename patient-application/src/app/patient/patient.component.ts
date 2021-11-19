import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.serivce';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  doctors: any;
  doctor: any;
  name: string ="";
  lastName: string ="";
  username: string ="";
  password: string ="";
  email: string ="";

  constructor(private _patientService:PatientService) { }

  ngOnInit(): void {
    this.getFreeDoctor();
  }

  registerPatient(): void{
    this._patientService.registerPatient(this.name, this.lastName, this.username, this.password);
  }

  getFreeDoctor():void {
    this._patientService.getFreeDoctors().subscribe(f => this.doctors = f);
  }

}
