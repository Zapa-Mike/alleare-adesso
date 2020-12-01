import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';
import { Data } from '@angular/router';

@Component({
  selector: 'two-answers',
  template: `
  <div class="cardBehauptung">
      <div class="Fragenstellung">Frage </div>
    </div>
    <div class="grid-containerBehauptung">
      <button id="A1" class="antwort shadow"></button>
      <button id="A2" class="antwort shadow"></button>
    </div>

    `,
  styleUrls: ['./quiz.component.css'],
})
export class TwoAnswersComponent implements OnInit, DoCheck {
  form: FormGroup;
  index: number = 0;
  antwort1 = []; 
  antwort2 = [];

  anzeigeAntwort1: string;
  anzeigeAntwort2: string;
  //Variablen zum speichern der Liste
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
    .collection('Fragenkatalog');
  dbget = firebase.firestore().collection('Fragenkatalog');

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

  ngDoCheck() {
    }
  }

 
