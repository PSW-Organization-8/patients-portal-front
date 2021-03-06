import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RandomNumberGeneratorService } from './services/feedback.service';
import { FeedbackComponent } from './feedback/feedback.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';
import { PatientComponent } from './patient/patient.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoginComponent } from './login/login.component';
import { SurveyComponent } from './survey/survey.component';
import { StandardAppointmentComponent } from './standard-appointment/standard-appointment.component';
import { PriorityBasedAppointmentComponent } from './priority-based-appointment/priority-based-appointment.component';
import { DatePipe } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    HomeComponent,
    HeaderComponent,
    PatientRecordComponent,
    PatientComponent,
    LoginComponent,
    SurveyComponent,
    StandardAppointmentComponent,
    PriorityBasedAppointmentComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    RouterModule.forRoot([]),
    NgMultiSelectDropDownModule.forRoot(),
    NoopAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [
    RandomNumberGeneratorService,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
