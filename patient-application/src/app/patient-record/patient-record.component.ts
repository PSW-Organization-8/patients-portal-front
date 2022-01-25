import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { DoctorService } from '../services/doctor.service';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { MedicalReportComponent } from '../medical-report/medical-report.component';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css']
})
export class PatientRecordComponent implements OnInit {

  appointments: any;
  allergies: any;
  doctor: any;
  patient: any;
  patientUsername: any;
  medicalReport: any;
  constructor(private _patientService:PatientService, private _doctorService:DoctorService, private _appointmentService:AppointmentService, private router:Router, private _loginService:LoginService, private detailsDialog: MatDialog) { }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser(){
    let token = localStorage.getItem('token');
    if(token === null)
      token = ""
    this._loginService.getLoggedUserFromServer(token).subscribe(f=> {
      this.getPatient(f.username)
    }
    );
  }

  getPatient(username:any): void{
    this._patientService.getPatientByUsernameFromServer(username).subscribe(
      (successData: any) => {  this.patient = successData },
      () => {},
      () => { this.getDoctor(this.patient.id), this.getPatientAllergens(this.patient.id), this.getAppointmets(this.patient.id)}
      );
  }

  getDoctor(id: number): void{
    this._doctorService.getDoctorFromServer(id).subscribe((d: any) => this.doctor = d);
  }

  getAllergies(){
    this._patientService.getAllergens().subscribe(a => this.allergies = a)
  }

  getPatientAllergens(patientId: number){
    this._patientService.getPatientsAllergens(patientId).subscribe(a => this.allergies = a)
  }

  getAppointmets(id: number): void {
    this._patientService.getPatientAppointments(id).subscribe(ap => this.appointments = ap)
  }

  getMedicalReport(id: number): void{
    this._appointmentService.getMedicalReport(id).subscribe(r => {this.medicalReport = r;
      const dialogRef = this.detailsDialog.open(MedicalReportComponent, {data:this.medicalReport});
    })
  }

  cancelAppointment(appointmentId: number): void{
    this._appointmentService.cancelAppointment(appointmentId).subscribe(() => this.getAppointmets(1))
  }

  setCurrentAppointment(appointmentId: number): void{
    this._appointmentService.setCurrentAppointment(appointmentId);
    this.router.navigate(['/survey']);
  }
}
