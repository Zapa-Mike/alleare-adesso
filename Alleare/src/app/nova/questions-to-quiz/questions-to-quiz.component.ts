import { Component, OnInit } from '@angular/core';

interface QuestionAnswer {
  question: string;
  answer: string;
  toggle: boolean;
}
@Component({
  selector: 'questions-to-quiz',
  templateUrl: './questions-to-quiz.component.html',
  styleUrls: ['./questions-to-quiz.component.css'],
})
export class QuestionsToQuizComponent implements OnInit {
  questionAnswers: QuestionAnswer[] = [
    {
      question: 'Beeinflusst das Quiz meine Favoriten?',
      answer:
        'Das Quiz kannst du komplett unabhängig von den Favoriten abschließen ohne das diese beeinflusst werden.',
      toggle: false,
    },
    {
      question: 'Wird die Auswertung gespeichert?',
      answer: 'Die Auswertung des Quiz wird nicht gespeichert.',
      toggle: false,
    },
    {
      question: 'Muss ich das Quiz machen?',
      answer:
        'Das Quiz kannst du jederzeit freiwillig machen. Es soll dir die Möglichkeit geben deinen Wissensstand eigenständig zu überprüfen.',
      toggle: false,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
