import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  @Input() answers: string[] = ['yes', 'no'];
  @Input() story: string;
  constructor() {}
  
}
 