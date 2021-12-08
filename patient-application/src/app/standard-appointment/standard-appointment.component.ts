import { Component, OnInit } from '@angular/core';
import { StandardAppointmentService } from '../services/standard-appointment.service';
import { doctorSpecializations } from '../app.consts';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


  validDate: boolean = false;

  constructor(private _standardAppointmentService: StandardAppointmentService) { }

  ngOnInit(): void {
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
      "patientId": 1
    }
    this._standardAppointmentService.scheduleAppointment(appointment);

    
  }

  showFreeTerms(): void{
    (<HTMLInputElement> document.getElementById("nextButton2")).disabled = false;
    this._standardAppointmentService.getFreeTerms(this.startDate, this.doctor.id).subscribe(terms => this.terms = terms);
  }

  setDate(e: Date) {
    this.startDate = e;
    (<HTMLInputElement> document.getElementById("nextButton")).disabled = false;
  }
}