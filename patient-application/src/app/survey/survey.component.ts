import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RandomNumberGeneratorService } from '../services/feedback.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }


  surveys = [
    {id: 1, name:'Tekst 1 pitanja', enum: 1},
    {id: 2, name:'Tekst 2 pitanjaaaaaaaaaaaaaaaaaaaaaaaaaaa', enum: 1},
    {id: 5, name:'Tekst 3 pitanja', enum: 2},
    {id: 3, name:'Tekst 4 pitanjaauauauauauauauauau', enum: 2},
    {id: 4, name:'Tekst 5 pitanja', enum: 3}
];
}
