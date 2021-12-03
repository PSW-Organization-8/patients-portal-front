import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { SurveyComponent } from './survey/survey.component';
import { StandardAppointmentComponent } from './standard-appointment/standard-appointment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'record', component: PatientRecordComponent},
  { path: 'survey', component: SurveyComponent },
  { path: 'patientRegistraion', component: PatientComponent},
  { path: 'patientLogin', component: LoginComponent},
  { path: 'survey', component: SurveyComponent },
  { path: 'standardAppointment', component: StandardAppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
