import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'patientRegistraion', component: PatientComponent},
  { path: 'patientLogin', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
