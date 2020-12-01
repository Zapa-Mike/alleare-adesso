import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'questionaire-question',
  templateUrl: './questionaire-question.component.html',
  styleUrls: ['./questionaire-question.component.css'],
})
export class QuestionaireQuestionComponent implements OnInit {
  @Input() toggle: boolean = false;
  @Input() answer: string = '';
  @Input() question: string = '';
  constructor() {}

  ngOnInit(): void {}
}