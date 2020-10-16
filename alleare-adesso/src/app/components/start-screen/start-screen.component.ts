import { Component, OnInit } from '@angular/core';

interface textQuestion {
  text: string;
  answers: string[];
}

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css'],
})
export class StartScreenComponent implements OnInit {
  public data: textQuestion[] = [
    {
      text: 'aslkhtselkgdlksd gselkg eslkg sekljs g',
      answers: ['yes', 'no'],
    },
    {
      text: ' lorem eslkg sekljs g',
      answers: ['Arbeitnehmer', 'Arno', 'Student'],
    },
    {
      text: ' lorem eslkg sekljs g',
      answers: ['Arbeitnehmer', 'Arnold', 'Student'],
    },
    {
      text: 'joke',
      answers: [],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
