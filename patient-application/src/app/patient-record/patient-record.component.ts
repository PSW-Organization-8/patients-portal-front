import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css']
})
export class PatientRecordComponent implements OnInit {

  patient: any;
  constructor(private _patientService:PatientService) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void{
    this._patientService.getPatientFromServer(1).subscribe((p: any) => this.patient = p);
  }

}
