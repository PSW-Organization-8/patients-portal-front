import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css']
})
export class PatientRecordComponent implements OnInit {

  doctor: any;
  patient: any;
  constructor(private _patientService:PatientService, private _doctorService:DoctorService) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void{
    this._patientService.getPatientFromServer(1).subscribe(
      (successData: any) => {  this.patient = successData },
      () => {},
      () => { this.getDoctor(this.patient.id) }
      );
  }

  getDoctor(x: number): void{
    this._doctorService.getDoctorFromServer(x).subscribe((d: any) => this.doctor = d);
  }

}
