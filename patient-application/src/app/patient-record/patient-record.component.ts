import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { DoctorService } from '../services/doctor.service';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css']
})
export class PatientRecordComponent implements OnInit {

  appointments: any;
  allergies: any;
  doctor: any;
  patient: any;
  constructor(private _patientService:PatientService, private _doctorService:DoctorService, private _appointmentService:AppointmentService) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(): void{
    this._patientService.getPatientFromServer(1).subscribe(
      (successData: any) => {  this.patient = successData },
      () => {},
      () => { this.getDoctor(this.patient.id), this.getAllergies(), this.getAppointmets(this.patient.id) }
      );
  }

  getDoctor(id: number): void{
    this._doctorService.getDoctorFromServer(id).subscribe((d: any) => this.doctor = d);
  }

  getAllergies(){
    this._patientService.getAllergens().subscribe(a => this.allergies = a)
  }

  getAppointmets(id: number): void {
    this._patientService.getPatientAppointments(id).subscribe(ap => this.appointments = ap)
  }

  cancelAppointment(appointmentId: number): void{
    this._appointmentService.cancelAppointment(appointmentId).subscribe(() => this.getAppointmets(1))
  }
}
