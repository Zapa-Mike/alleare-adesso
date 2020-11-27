import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css'],
})
export class QuizQuestionComponent implements OnInit {
  @Input() toggle: boolean = false;
  @Input() answer: string = '';
  @Input() question: string = '';
  constructor() {}

  ngOnInit(): void {}
}
