import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'info-question',
  templateUrl: './info-question.component.html',
  styleUrls: ['./info-question.component.css'],
})
export class InfoQuestionComponent implements OnInit {
  @Input() toggle: boolean = false;
  @Input() answer: string = '';
  @Input() question: string = '';
  constructor() {}

  ngOnInit(): void {}
}