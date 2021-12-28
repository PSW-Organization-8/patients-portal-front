import { Component, OnInit } from '@angular/core';
import { RandomNumberGeneratorService } from '../services/feedback.service';
import { PatientService } from '../services/patient.service';
import { LoginService } from '../services/login.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  approvedFeedback: any;
  patient: any;
  constructor(private _feedbackService:RandomNumberGeneratorService, private _patientService:PatientService, private _loginService:LoginService) { }

  ngOnInit(): void {
    this.getApprovedFeedback();
    this.getPatient();
    this.getLoggedUser()
  }

  getLoggedUser(){
    let token = localStorage.getItem('token');
    if(token === null)
      token = ""
    this._loginService.getLoggedUserFromServer(token).subscribe(f=> {
      alert(f.username)

    });

  }

  getApprovedFeedback(): void{
    this._feedbackService.getApprovedFeedbackFromServer().subscribe(f => this.approvedFeedback = f);
  }

  getPatient(): void{
    this._patientService.getPatientFromServer(1).subscribe((p: any) => this.patient = p);
  }
}
