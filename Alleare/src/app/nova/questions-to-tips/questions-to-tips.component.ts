import { Component, OnInit } from '@angular/core';

interface QuestionAnswer {
  question: string;
  answer: string;
  toggle: boolean;
}
@Component({
  selector: 'questions-to-tips',
  templateUrl: './questions-to-tips.component.html',
  styleUrls: ['./questions-to-tips.component.css'],
})
export class QuestionsToTipsComponent implements OnInit {
  questionAnswers: QuestionAnswer[] = [
    {
      question: 'first question',
      answer: 'first answer',
      toggle: false,
    },
    {
      question: 'second question',
      answer: 'second answer',
      toggle: false,
    },
    {
      question: 'third question',
      answer: 'third answer',
      toggle: false,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
