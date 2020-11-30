import { Component, OnInit } from '@angular/core';

interface QuestionAnswer {
  question: string;
  answer: string;
  toggle: boolean;
}
@Component({
  selector: 'questions-to-infos',
  templateUrl: './questions-to-infos.component.html',
  styleUrls: ['./questions-to-infos.component.css'],
})
export class QuestionsToInfosComponent implements OnInit {
  questionAnswers: QuestionAnswer[] = [
    {
      question: 'Was sind Infos?',
      answer:
        'In den Infos findest du viele Erklärungen zu verschiedenen Versicherungen, diese dir helfen sollen die Versicherungen besser zu verstehen.',
      toggle: false,
    },
    {
      question: 'Was steht in den Favoriten?',
      answer:
        'In den Favoriten werden dir nochmal extra die Versicherungen, anhand der Auswertung des Fragenkatalogs, angezeigt, sodass du sie schnell wiederfindest. Sie sind markiert mit einem gelben Stern.',
      toggle: false,
    },
    {
      question: 'Kann ich alles in den Infos favorisieren?',
      answer:
        'Du kannst selber, im Bereich Allgemein, so viele Versicherungen favorisieren wie du willst. Diese findest du dann auch in deinen Favoriten.',
      toggle: false,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
