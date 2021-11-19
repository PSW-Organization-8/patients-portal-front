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
    {id: 1, text:'Tekst 1 pitanja', category: 0},
    {id: 2, text:'Tekst 2 pitanja', category: 0},
    {id: 3, text:'Tekst 3 pitanja', category: 0},
    {id: 4, text:'Tekst 4 pitanja', category: 0},
    {id: 5, text:'Tekst 5 pitanja', category: 0},

    {id: 6, text:'Tekst 6 pitanja', category: 1},
    {id: 7, text:'Tekst 7 pitanjaa', category: 1},
    {id: 8, text:'Tekst 8 pitanja', category: 1},
    {id: 9, text:'Tekst 9 pitanja', category: 1},
    {id: 10, text:'Tekst 10 pitanja', category: 1},

    {id: 11, text:'Tekst 11 pitanja', category: 2},
    {id: 12, text:'Tekst 12 pitanja', category: 2},
    {id: 13, text:'Tekst 13 pitanja', category: 2},
    {id: 14, text:'Tekst 14 pitanja', category: 2},
    {id: 15, text:'Tekst 15 pitanja', category: 2}
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
