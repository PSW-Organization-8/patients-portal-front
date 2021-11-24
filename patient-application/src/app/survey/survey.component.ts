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
    {id: 1, text:'How would you rate doctors professionalism?', category: 0},
    {id: 2, text:'How would you rate doctors politeness?', category: 0},
    {id: 3, text:'How would you rate doctors technicality?', category: 0},
    {id: 4, text:'How would you rate doctors skill?', category: 0},
    {id: 5, text:'How would you rate doctors knowledge?', category: 0},

    {id: 6, text:'How would you rate hospital environment?', category: 1},
    {id: 7, text:'How would you rate hospital equipment?', category: 1},
    {id: 8, text:'How would you rate hospital hygiene?', category: 1},
    {id: 9, text:'How would you rate hospital prices?', category: 1},
    {id: 10, text:'How would you rate hospital waiting time?', category: 1},

    {id: 11, text:'How would you rate medical staffs professionalism?', category: 2},
    {id: 12, text:'How would you rate medical staffs politeness?', category: 2},
    {id: 13, text:'How would you rate medical staffs technicality?', category: 2},
    {id: 14, text:'How would you rate medical staffs skill?', category: 2},
    {id: 15, text:'How would you rate medical staffs knowledge?', category: 2}
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
    text: questionObject.text,
    value: value,
    category: questionObject.category
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
