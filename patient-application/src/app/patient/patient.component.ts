import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {


  dropdownSettings: IDropdownSettings = {};
  doctors: any;
  doctor: any;
  allergens: any;
  selectedAllergens: Array<any> = [];
  name: string = "";
  lastName: string = "";
  username: string = "";
  password: string = "";
  email: string = "";
  country: string = "";
  city: string = "";
  address: string = "";
  bloodType: string = "";
  jmbg: string = "";
  phone: string = "";
  dateOfBirth: string = "";
  todayDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
  picture: string = "";
  pictureFile : any;
  allUsernames: any;
  allEmails: any;

  constructor(private _patientService: PatientService) { }

  ngOnInit(): void {
    this.getFreeDoctor();
    this.getAllergens();
    this.getAllUsernames();
    this.getAllEmails();
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
      noDataAvailablePlaceholderText: "There is no allergens to show",
      enableCheckAll: false,
      allowSearchFilter: true,
    };
  }

  handleFileSelect(evt:any): void {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      var urlReader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);

      urlReader.readAsDataURL(file);
      urlReader.onload = (_event) => {
        this.pictureFile = urlReader.result; 
      }
      
    }
  }

  _handleReaderLoaded(readerEvt:any): void{
    var binaryString = readerEvt.target.result;
    this.picture = btoa(binaryString);
    console.log(btoa(binaryString));
  }

  registerPatient(): void {
    var bloodTypeSelect = (<HTMLInputElement>document.getElementById("bloodTypeSelect")).value;
    this.bloodType = String(bloodTypeSelect);
    this._patientService.registerPatient(this.name, this.lastName, this.username, this.password, this.jmbg, this.email, this.phone, this.selectedAllergens,
      this.dateOfBirth, this.bloodType, this.country, this.city, this.address, this.doctor, this.picture)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Successfully registration. Please check your email to activate your account.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
      }

  getFreeDoctor(): void {
    this._patientService.getFreeDoctors().subscribe(f => this.doctors = f);
  }

  getAllergens(): void {
    this._patientService.getAllergens().subscribe(f => this.allergens = f);
  }

  getAllUsernames(): void {
    this._patientService.getAllUsernames().subscribe(f => this.allUsernames = f);
  }

  getAllEmails(): void {
    this._patientService.getAllEmails().subscribe(f => this.allEmails = f);
  }

  onItemSelect(item: any) {
    this.selectedAllergens.push(item);
  }

  onItemDeSelect(obj: any) {
    this.selectedAllergens = this.selectedAllergens.filter(item => item !== obj);
  }
}
