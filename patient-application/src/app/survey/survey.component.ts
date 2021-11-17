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
    {id: 1, name:'Tekst 1 pitanja', enum: 1},
    {id: 2, name:'Tekst 2 pitanjaaaaaaaaaaaaaaaaaaaaaaaaaaa', enum: 1},
    {id: 3, name:'Tekst 3 pitanja', enum: 2},
    {id: 4, name:'Tekst 4 pitanjaauauauauauauauauau', enum: 2},
    {id: 5, name:'Tekst 5 pitanja', enum: 3}
];


sendSurvey(): void{
  this._surveyService.sendSurveyToServer(this.surveyRatings);
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
