import { Component, OnInit } from '@angular/core';
import { StandardAppointmentService } from '../services/standard-appointment.service';
import { doctorSpecializations } from '../app.consts';
import { getLocaleDateTimeFormat } from '@angular/common';
@Component({
  selector: 'app-standard-appointment',
  templateUrl: './standard-appointment.component.html',
  styleUrls: ['./standard-appointment.component.css']
})



export class StandardAppointmentComponent implements OnInit {
  doctors: any
  doctor: any;
  term: any;
  terms: any
  selectedOption: string = "";
  specializations = doctorSpecializations
  constructor(private _standardAppointmentService: StandardAppointmentService) { }

  ngOnInit(): void {
  }

  showDoctors(): void {
    this._standardAppointmentService.getSpecificDoctors(this.selectedOption).subscribe(doctors => this.doctors = doctors);
  }

  scheduleAppointment(): void{
    let appointment = {
      "startTime": Date.now,
      "doctorId": this.doctor.id,
      "patientId": 1
    }
    this._standardAppointmentService.scheduleAppointment(appointment)
  }
  showFreeTerms(): void{
    let data = {
      "startTime": new Date(2021, 12, 3, 7, 0, 0),
      "doctorId" : 1
    };
    this._standardAppointmentService.getFreeTerms(data).subscribe(terms => this.terms = terms);
  }
}