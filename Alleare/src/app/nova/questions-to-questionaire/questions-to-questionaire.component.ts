import { Component, OnInit } from '@angular/core';

interface QuestionAnswer {
  question: string;
  answer: string;
  toggle: boolean;
}
@Component({
  selector: 'questions-to-questionaire',
  templateUrl: './questions-to-questionaire.component.html',
  styleUrls: ['./questions-to-questionaire.component.css'],
})
export class QuestionsToQuestionaireComponent implements OnInit {
  questionAnswers: QuestionAnswer[] = [
    {
      question: 'Wofür brauche ich den Fragenkatalog?',
      answer:
        'Mit der Durchführung des Fragenkatalogs können wir dir eine für dich angepasste Empfehlung geben, welche Versicherungen dir in deinem Alltag helfen würden.',
      toggle: false,
    },
    {
      question: 'Kann ich auch später den Fragenkatalog weitermachen?',
      answer:
        'Deine Antworten werden nicht gespeichert, wenn du den Fragenkatalog vor der Auswertung beendest. Du kannst jederzeit den Fragekatalog von neu durchgehen. ',
      toggle: false,
    },
    {
      question: 'Was ist, wenn keine Antwortmöglichkeiten passen?',
      answer:
        'Die Antwortmöglichkeiten sind so gegeben, dass du immer eine passende Antwort findest.',
      toggle: false,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
