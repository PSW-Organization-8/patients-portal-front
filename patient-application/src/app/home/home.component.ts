import { Component, OnInit } from '@angular/core';
import { RandomNumberGeneratorService } from '../services/feedback.service';
import { PatientService } from '../services/patient.service';
import { LoginService } from '../services/login.service';
import { HttpHeaders } from '@angular/common/http';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  approvedFeedback: any;
  patient: any;

  promotions: any;

  constructor(private _feedbackService:RandomNumberGeneratorService, 
    private _patientService:PatientService, 
    private _loginService:LoginService,
    private _eventService: EventService,
    config: NgbCarouselConfig) {
      config.interval = 3000;  
      config.wrap = true;  
      config.keyboard = false;  
      config.pauseOnHover = false;  
     }

  ngOnInit(): void {
    this.getApprovedFeedback();
    this.getPatient();
    this.getLoggedUser()

    this.getPromotions();
  }

  getPromotions(){
    this._eventService.getPromotions().subscribe((promotions: any) => this.promotions = promotions);
  }

  index(){

  }

  getLoggedUser(){
    let token = localStorage.getItem('token');
    if(token === null)
      token = ""
    this._loginService.getLoggedUserFromServer(token).subscribe(f=> {
      //alert(f.username)
    });

  }

  getApprovedFeedback(){
    this._feedbackService.getApprovedFeedbackFromServer().subscribe(f => this.approvedFeedback = f);
  }

  getPatient(){
    this._patientService.getPatientFromServer(1).subscribe((p: any) => this.patient = p);
  }
}
