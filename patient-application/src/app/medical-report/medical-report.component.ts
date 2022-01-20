import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-medical-report',
  templateUrl: './medical-report.component.html',
  styleUrls: ['./medical-report.component.css']
})
export class MedicalReportComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MedicalReportComponent>, @Inject(MAT_DIALOG_DATA) public report: any) {}

  ngOnInit(): void {
  }

}
