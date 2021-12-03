import { Component, OnInit } from '@angular/core';
import { StandardAppointmentService } from '../services/standard-appointment.service';
import { doctorSpecializations } from '../app.consts';
@Component({
  selector: 'app-standard-appointment',
  templateUrl: './standard-appointment.component.html',
  styleUrls: ['./standard-appointment.component.css']
})



export class StandardAppointmentComponent implements OnInit {
  doctors: any
  doctor: any;
  selectedOption: string = "";
  specializations = doctorSpecializations
  constructor(private _standardAppointmentService: StandardAppointmentService) { }

  ngOnInit(): void {
  }

  showDoctors(): void {
    this._standardAppointmentService.getSpecificDoctors(this.selectedOption).subscribe(doctors => this.doctors = doctors);
  }
}