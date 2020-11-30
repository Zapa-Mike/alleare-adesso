import { Component, OnInit } from '@angular/core';

interface QuestionAnswer {
  question: string;
  answer: string;
  toggle: boolean;
}
@Component({
  selector: 'questions-to-settings',
  templateUrl: './questions-to-settings.component.html',
  styleUrls: ['./questions-to-settings.component.css'],
})
export class QuestionsToSettingsComponent implements OnInit {
  questionAnswers: QuestionAnswer[] = [
    {
      question: 'Wie komme ich zu den Einstellungen?',
      answer:
        'Du kommst jederzeit zu den Einstellungen indem du im Home unten links auf das Rädchen klickst.',
      toggle: false,
    },
    {
      question: 'Was kann ich einstellen?',
      answer:
        'Alle für dich relevanten Einstellungen kannst du ändern: Push-Benachrichtigung​, Sprache, Dark Mode​ und Audio.',
      toggle: false,
    },
    {
      question: 'Wo kann ich die Audioeinstellungen verändern?',
      answer:
        'Die Audio kannst du in den Einstelllungen unter Audio Einstellung ändern.',
      toggle: false,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
