import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';
import { Data } from '@angular/router';

@Component({
  selector: 'four-answers',
  template: `
    <div class="card">
      <div class="Fragenstellung">Frage</div>
    </div>
    <div class="grid-containerAntworten">
      <button id="A1" class="antwort shadow">A1</button>
      <button id="A2" class="antwort shadow">A2</button>
      <button id="A3" class="antwort shadow">A3</button>
      <button id="A4" class="antwort shadow">A4</button>
    </div>
  `,
  styleUrls: ['./quiz.component.css'],
})
export class FourAnswersComponent implements OnInit, DoCheck {
  form: FormGroup;
  index: number = 0;
  antwort1 = []; 
  antwort2 = [];
  antwort3 = [];
  antwort4 = [];

  anzeigeAntwort1: string;
  anzeigeAntwort2: string;
  anzeigeAntwort3: string;
  anzeigeAntwort4: string;
  //Variablen zum speichern der Liste
  bildstory: any[] = [];
  bildradio: any[] = [];
  storyfrage: string[] = [];
  radiofrage: string[] = [];
  story: string[] = [];
  docidstory: any[] = [];
  docidradio: any[] = [];
  storyvisible: boolean = true;

  storyanzeige: string;
  fragenanzeige: string;
  bildanzeige: any;
  storiesausblenden: boolean = false;
  indexstory = [];
  jalla: boolean;

  dbpush = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Quiz');
  dbget = firebase.firestore().collection('Quiz');

  constructor(private dataservice: DataService) {
    this.form = new FormGroup({
      stories: new FormControl(),
    });
  }

  ngOnInit() {
    if (this.dataservice.getIndexTemp1() == null) {
      console.log('anfang');
    } else {
      this.index = this.dataservice.getIndexTemp1() - 1;
      if (this.index < 0) {
        this.index = 0;
      }
    }
  }

  ngDoCheck() {}
}
