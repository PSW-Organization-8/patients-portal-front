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
  term: any;
  terms: any;
  startDate: any;
  selectedSpecialization: string = "";
  specializations = doctorSpecializations
  constructor(private _standardAppointmentService: StandardAppointmentService) { }

  ngOnInit(): void {
  }

  showDoctors(): void {
    this._standardAppointmentService.getSpecificDoctors(this.selectedSpecialization).subscribe(doctors => this.doctors = doctors);
  }

  scheduleAppointment(): void{
    let appointment = {
      "startTime": this.term,
      "doctorId": this.doctor.id,
      "patientId": 1
    }
    this._standardAppointmentService.scheduleAppointment(appointment);
  }

  showFreeTerms(): void{
    this._standardAppointmentService.getFreeTerms(this.startDate, this.doctor.id).subscribe(terms => this.terms = terms);
  }

  setDate(e: Date) {
    this.startDate = e;
  }
  selectTerm(selectedRow: any): void{
    this.term = selectedRow;
  }
}