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
      question: 'Was wird in Tipps gezeigt?',
      answer:
        'Hier werden dir nützliche Tipps verschiedenster Art gezeigt, diese dir in sämtlichen Alltagssituationen das Leben erleichtern sollen.',
      toggle: false,
    },
    {
      question: 'Warum werden mir dort diverse Themen vorgestellt?',
      answer:
        'Mit der großen Anzahl an Tipps möchten wir dir in vielen Lebenssituationen weiterhelfen können.',
      toggle: false,
    },
    {
      question: 'Wofür brauche ich diese Tipps?​',
      answer: 'Die Tipps sollen dir zusätzlich auch außerhalb der App weiter helfen, um dich in sämtlichen Lebenslagen zu unterstützen.',
      toggle: false,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
