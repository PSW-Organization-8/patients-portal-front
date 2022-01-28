import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RandomNumberGeneratorService } from '../services/feedback.service';
import { LoginService } from '../services/login.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedback: any;
  content: string = "";
  anonymous: boolean = false;
  publishable: boolean = true;
  isContentEmpty: boolean = true;
  patient:any;

  constructor(private _feedbackService:RandomNumberGeneratorService, private _patientService:PatientService, private _loginService:LoginService) { }

  ngOnInit(): void {
    this.getLoggedUser();
    this.getFeedback();
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

  getFeedback(): void{
    this._feedbackService.getFeedbackFromServer().subscribe(f => this.feedback = f);
  }

  sendFeedback(): void{
    if(this.content == ""){
      /*Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill out the text field',
      })*/
      alert('Please fill out the text field');
    }
    else{
      let token = localStorage.getItem('token');
      if(token === null)
        token = ""

      this._feedbackService.sendFeedbackToServer(this.content, this.anonymous, this.publishable, token, this.patient);
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
        title: 'Successfully sent feedback'
      })
      this.content = "";
    }
  }
}
