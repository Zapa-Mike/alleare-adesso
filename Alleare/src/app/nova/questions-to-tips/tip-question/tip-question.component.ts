import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tip-question',
  templateUrl: './tip-question.component.html',
  styleUrls: ['./tip-question.component.css'],
})
export class TipQuestionComponent implements OnInit {
  @Input() toggle: boolean = false;
  @Input() answer: string = '';
  @Input() question: string = '';
  constructor() {}

  ngOnInit(): void {}
}
