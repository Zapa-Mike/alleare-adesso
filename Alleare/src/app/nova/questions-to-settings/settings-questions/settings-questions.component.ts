import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'settings-questions',
  templateUrl: './settings-questions.component.html',
  styleUrls: ['./settings-questions.component.css']
})
export class SettingsQuestionsComponent implements OnInit {
  @Input() toggle: boolean = false;
  @Input() answer: string = '';
  @Input() question: string = '';
  constructor() {}

  ngOnInit(): void {}
}
