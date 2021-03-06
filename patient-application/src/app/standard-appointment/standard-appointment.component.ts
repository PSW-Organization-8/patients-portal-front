import { Component, OnInit } from '@angular/core';
import { StandardAppointmentService } from '../services/standard-appointment.service';
import { doctorSpecializations } from '../app.consts';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { PatientService } from '../services/patient.service';
@Component({
  selector: 'app-standard-appointment',
  templateUrl: './test.html',
  styleUrls: ['./test.css']
})

export class StandardAppointmentComponent implements OnInit {
  doctors: any
  doctor: any;
  term: any;
  terms: any;
  startDate: any;
  selectedSpecialization: string = "";
  specializations = doctorSpecializations;
  todayDate:string = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
  patient: any;


  validDate: boolean = false;

  constructor(private _standardAppointmentService: StandardAppointmentService, private _loginService:LoginService, private _patientService:PatientService) { }

  ngOnInit(): void {
    this.getLoggedUser()
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
      () => {}
      );
  }

  showDoctors(): void {
    (<HTMLInputElement> document.getElementById("nextButton1")).disabled = false;
    this._standardAppointmentService.getSpecificDoctors(this.selectedSpecialization).subscribe(doctors => this.doctors = doctors);
  }

  scheduleAppointment(selectedTerm: any): void{
    this.term = selectedTerm;
    let appointment = {
      "startTime": this.term,
      "doctorId": this.doctor.id,
      "patientId": this.patient.id
    }
    let token = localStorage.getItem('token');
    if(token === null)
      token = ""
    this._standardAppointmentService.scheduleAppointment(appointment, token);
  }

  showFreeTerms(): void{
    (<HTMLInputElement> document.getElementById("nextButton2")).disabled = false;
    this._standardAppointmentService.getFreeTerms(this.startDate, this.doctor.id).subscribe(terms => this.terms = terms);
  }

  setDate(e: Date) {
    this.startDate = e;
    (<HTMLInputElement> document.getElementById("nextButton")).disabled = false;
  }

  selectTerm(selectedRow: any): void{
    this.term = selectedRow;
  }
}