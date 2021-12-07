import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { StandardAppointmentService } from '../services/standard-appointment.service';
import { StandardAppointmentComponent } from '../standard-appointment/standard-appointment.component';

@Component({
  selector: 'app-priority-based-appointment',
  templateUrl: './priority-based-appointment.component.html',
  styleUrls: ['./priority-based-appointment.component.css']
})
export class PriorityBasedAppointmentComponent implements OnInit {

  doctors: any;
  doctor: any;
  firstDate: any;
  lastDate: any;
  priority: boolean = true;
  freeTerms: any;
  selectedTerm : any;

  constructor(private _doctorService: DoctorService, private datePipe: DatePipe, private _appointmentService: StandardAppointmentService) { }

  ngOnInit(): void {
    this._doctorService.getAllDoctors().subscribe(d => this.doctors = d);
  }

  getByPriority(): void{
    if(this.firstDate != null && this.lastDate != null && this.doctor != null){
      var theDate = new Date(this.lastDate);
      theDate.setDate(theDate.getDate()+1);
      let lastDateFix =this.datePipe.transform(theDate, 'yyyy-MM-dd');
      this._doctorService.getDatesByPriority(this.doctor, this.firstDate, lastDateFix, this.priority).subscribe(a => this.freeTerms = a)
    }
  }

  selectTerm(value: any) : void{
    this.selectedTerm = value;
  }

  setFirstDate(date: Date){
    this.firstDate = date;
  }

  setLastDate(date: Date){
    this.lastDate = date;
  }

  createAppointment(){
    let appointment = {
      "startTime": this.selectedTerm,
      "doctorId": this.doctor.id,
      "patientId": 1
    }
    this._appointmentService.scheduleAppointment(appointment);
  }
}
