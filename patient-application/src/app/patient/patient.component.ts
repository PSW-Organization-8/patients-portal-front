import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PatientService } from '../services/patient.serivce';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {

  
  dropdownSettings:IDropdownSettings={};
  doctors: any;
  doctor: any;
  allergens: any;
  selectedAllergens: Array<any> = [];
  name: string ="";
  lastName: string ="";
  username: string ="";
  password: string ="";
  email: string ="";
  country: string ="";
  city: string ="";
  address: string ="";
  bloodType: string ="";
  jmbg: string ="";
  phone: string ="";
  dateOfBirth: string = "";
  todayDate:string = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');

  constructor(private _patientService:PatientService) { }

  ngOnInit(): void {
    this.getFreeDoctor();
    this.getAllergens();
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
      noDataAvailablePlaceholderText: "There is no allergens to show",
      enableCheckAll: false,
      allowSearchFilter: true,
    };
  }

  registerPatient(): void{
    this._patientService.registerPatient(this.name, this.lastName, this.username, this.password, this.jmbg, this.email, this.phone, this.selectedAllergens, this.dateOfBirth, this.bloodType, this.country, this.city, this.address, this.doctor);
  }

  getFreeDoctor():void {
    this._patientService.getFreeDoctors().subscribe(f => this.doctors = f);
  }

  getAllergens():void {
    this._patientService.getAllergens().subscribe(f => this.allergens = f);
  }

  onItemSelect(item: any) {
    this.selectedAllergens.push(item);
  }

  onItemDeSelect(obj: any) {
    this.selectedAllergens = this.selectedAllergens.filter(item => item !== obj);
  }
}
