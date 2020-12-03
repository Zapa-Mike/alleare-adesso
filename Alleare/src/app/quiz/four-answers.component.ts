import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';
import { Data } from '@angular/router';
import { query } from '@angular/animations';
import { domainToUnicode } from 'url';

@Component({
  selector: 'four-answers',
  template: `
    <div class="card">
      <div class="Fragenstellung">{{ anzeige }}</div>
    </div>
    <div class="grid-containerAntworten">
      <button
        id="{{ antwort1anzeige }}"
        class="antwort shadow"
        (click)="push($event)"
      >
        {{ antwort1anzeige }}
      </button>
      <button
        id="{{ antwort2anzeige }}"
        class="antwort shadow"
        (click)="push($event)"
      >
        {{ antwort2anzeige }}
      </button>
      <button
        id="{{ antwort3anzeige }}"
        class="antwort shadow"
        (click)="push($event)"
      >
        {{ antwort3anzeige }}
      </button>
      <button
        id="{{ antwort4anzeige }}"
        class="antwort shadow"
        (click)="push($event)"
      >
        {{ antwort4anzeige }}
      </button>
    </div>
    <div class="col rowVZ">
      <button id="Vbutton" class="btn">
        <img
          src="/assets/icons/icon_arrow_forward.svg"
          width="50"
          height="50"
          (click)="weiter()"
        />
      </button>
      <button id="Zbutton" class="btn">
        <img src="/assets/icons/icon_arrow_back.svg" width="50" height="50" />
      </button>
    </div>
  `,
  styleUrls: ['./quiz.component.css'],
})
export class FourAnswersComponent implements OnInit, DoCheck {
  get = firebase.firestore().collection('Quiz');
  index = 0;
  fragen = [];
  antwort1: string[] = [];
  antwort2: string[] = [];
  antwort3: string[] = [];
  antwort4: string[] = [];
  doclength: number = 0;
  docid = [];
  fragenauswahl = [];
  anzeige: string;
  antwort1anzeige: string;
  antwort2anzeige: string;
  antwort3anzeige: string;
  antwort4anzeige: string;
  indexrouting: number = 0;
  dbpush = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Quiz');

  constructor(private dataservice: DataService) {}

  ngOnInit() {
    const weiterButton = (document.getElementById(
      'Vbutton'
    ) as unknown) as HTMLInputElement;
    weiterButton.disabled = true;
    this.index = this.dataservice.getindexspeichernvier();
    this.get
      .where('type', '==', 'vierAntworten')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.doclength = this.doclength + 1;
          this.docid.push(doc.id);
          this.fragen.push(doc.data().Frage);
          this.antwort1.push(doc.data().antwort1);
          this.antwort2.push(doc.data().antwort2);
          this.antwort3.push(doc.data().antwort3);
          this.antwort4.push(doc.data().antwort4);
        });
      })
      .then(() => {
        for (let i = 0; i < 4; i++) {
          do {
            this.fragenauswahl[i] = Math.floor(
              Math.random() * this.doclength + 0
            ).toString();
          } while (this.fragenauswahl.includes(this.fragenauswahl[i]) == false);
        }
      });
  }

  ngDoCheck() {
    this.indexrouting = this.dataservice.getquizrouting();
    this.anzeige = this.fragen[this.fragenauswahl[this.index]];
    this.antwort1anzeige = this.antwort1[this.fragenauswahl[this.index]];
    this.antwort2anzeige = this.antwort2[this.fragenauswahl[this.index]];
    this.antwort3anzeige = this.antwort3[this.fragenauswahl[this.index]];
    this.antwort4anzeige = this.antwort4[this.fragenauswahl[this.index]];
  }

  push(event) {
    this.dbpush.doc(this.docid[this.fragenauswahl[this.index]]).set({
      antwort: event.target.id,
    });
    const weiterButton = (document.getElementById(
      'Vbutton'
    ) as unknown) as HTMLInputElement;
    weiterButton.disabled = false;
  }

  weiter() {
    this.index = this.index + 1;
    this.dataservice.addindexspeichernvier(this.index);
    this.indexrouting = this.indexrouting + 1;
    this.dataservice.addquizrouting(this.indexrouting);
    const weiterButton = (document.getElementById(
      'Vbutton'
    ) as unknown) as HTMLInputElement;
    weiterButton.disabled = true;
  }
}
