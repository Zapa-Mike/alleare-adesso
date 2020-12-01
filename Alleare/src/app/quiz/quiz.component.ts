import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  switch : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  weiter(){}
}

