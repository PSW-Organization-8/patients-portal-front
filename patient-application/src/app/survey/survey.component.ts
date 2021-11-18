import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  surveyRatings: Array<any> = [];

  constructor(private _surveyService:SurveyService) { }

  ngOnInit(): void {
  }

  surveys = [
    {id: 1, name:'Tekst 1 pitanja', enum: 0},
    {id: 2, name:'Tekst 2 pitanja', enum: 0},
    {id: 3, name:'Tekst 3 pitanja', enum: 0},
    {id: 4, name:'Tekst 4 pitanja', enum: 0},
    {id: 5, name:'Tekst 5pitanja', enum: 0},

    {id: 6, name:'Tekst 6 pitanja', enum: 1},
    {id: 7, name:'Tekst 7 pitanjaa', enum: 1},
    {id: 8, name:'Tekst 8 pitanja', enum: 1},
    {id: 9, name:'Tekst 9 pitanja', enum: 1},
    {id: 10, name:'Tekst 10 pitanja', enum: 1},

    {id: 11, name:'Tekst 1 pitanja', enum: 2},
    {id: 12, name:'Tekst 11 pitanja', enum: 2},
    {id: 13, name:'Tekst 5223 pitanja', enum: 2},
    {id: 14, name:'Tekst 54 pitanja', enum: 2},
    {id: 15, name:'Tekst 55 pitanja', enum: 2}
  ]

sendSurvey(): void {
    
  


  if(this.surveyRatings.length < 15){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please answer all the questions.',
    })
  }
  else{
    this._surveyService.sendSurveyToServer(this.surveyRatings);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Successfully sent feedback'
    })
  }
}

rateIt(value: number, questionObject: any): void{
  let doPush: boolean = true
  let question = {
    id: questionObject.id,
    text: questionObject.name,
    value: value,
    category: questionObject.enum
  };
  if(this.surveyRatings.length == 0){
    this.surveyRatings.push(question);
  }
  else
  {
    for(let q of this.surveyRatings){
      if(q.id == question.id){
        q.value = question.value;
        doPush = false;
        break;
      }
    }
    if(doPush){
      this.surveyRatings.push(question);
    }
  }
}

}
