import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    HomeComponent,
    HeaderComponent,
    PatientRecordComponent,
    PatientComponent,
    LoginComponent,
    SurveyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    RouterModule.forRoot([]),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [RandomNumberGeneratorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
