import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DoctorService } from '../services/doctor.service';
import { LoginService } from '../services/login.service';
import { PatientService } from '../services/patient.service';
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
  firstDateClass : string = "input";
  leastDate:string = formatDate(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd', 'en_US');
  tableDoctor: any;
  doctorId: any;
  patient:any;

  constructor(private _doctorService: DoctorService, private _patientService:PatientService, private datePipe: DatePipe, private _appointmentService: StandardAppointmentService, private _loginService:LoginService) { }

  ngOnInit(): void {
    this.getLoggedUser();
    this._doctorService.getAllDoctors().subscribe(d => this.doctors = d);
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


  getDoctorSpecialization(value: any): any{
    if(value == 0)
      return "Family physician"
    else if(value == 1)
      return "Surgeon"
    else if(value == 2)
      return "Internist"
    else if(value == 3)
      return "Dermatologist"
    else if(value == 4)
      return "Cardiologist"
    else if(value == 5)
      return "Otorhinolaryngologist"
    else if(value == 6)
      return "Dentist"
    else if(value == 7)
      return "Urologist"
    else if(value == 8)
      return "Gynecologist"
    else if(value == 9)
      return "Neurologist"
    else
      return "Undefined"
  }

  getByPriority(): void{
    if(this.firstDate != null && this.lastDate != null && this.doctor != null && this.lastDate >= this.firstDate){
      for(var i = 0; i < document.getElementsByClassName('appointmentImg').length; i++){
        document.getElementsByClassName('appointmentImg').item(i)?.setAttribute('src', 'https://drive.google.com/uc?id=1QnEOft9ZNZH4_MM276w5v5gfo9eMKfwz')
      }
      this.selectedTerm = null;
      var theDate = new Date(this.lastDate);
      theDate.setDate(theDate.getDate()+1);
      let lastDateFix =this.datePipe.transform(theDate, 'yyyy-MM-dd');

      let token = localStorage.getItem('token');
      if(token === null)
        token = ""

      this._doctorService.getDatesByPriority(this.doctor, this.firstDate, lastDateFix, this.priority, token).subscribe(a => this.freeTerms = a)
    }
    if(this.lastDate < this.firstDate)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Check the selected dates.',
      })
  }

  selectTerm(value: any, index: any, selectedDoctorId: any) : void{
    this.selectedTerm = value;
    this.doctorId = selectedDoctorId;
    for(var i = 0; i < document.getElementsByClassName('appointmentImg').length; i++){
      document.getElementsByClassName('appointmentImg').item(i)?.setAttribute('src', 'https://drive.google.com/uc?id=1QnEOft9ZNZH4_MM276w5v5gfo9eMKfwz')
    }
    document.getElementById("appointmentImgId" + index)?.setAttribute('src', 'https://drive.google.com/uc?id=1wj1lmHTaEi-L9lxM8UMgGIBRfXddVlt_');
  }

  setFirstDate(date: Date){
    this.firstDate = date;
  }

  setLastDate(date: Date){
    this.lastDate = date;
  }

  createAppointment(){
    if(this.selectedTerm == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please choose appointment to schedule.',
      })
    }
    else{
      let appointment = {
        "startTime": this.selectedTerm,
        "doctorId": this.doctorId,
        "patientId": this.patient.id
      }
      let token = localStorage.getItem('token');
      if(token === null)
        token = ""
      this._appointmentService.scheduleAppointment(appointment, token);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Appointment successfully scheduled',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    }
  }
}
