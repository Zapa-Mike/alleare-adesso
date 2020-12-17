import { Component, DoCheck, OnInit} from '@angular/core';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';
import { keyframes } from '@angular/animations';
import { QuizService } from '.././services/quiz.service';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'four-answers',
  template: `
    <div class="container">
      <div class="row">
        <div class="card">
          <div class="Fragenstellung">{{ anzeige }}</div>
        </div>
      </div>
      <div
        [hidden]="showModelBox"
        class="modal"
        data-backdrop="false"
        id="myModal"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title"><strong>Begründung</strong></h4>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              {{ begruendunganzeige }}
            </div>
            <div class="ButtonNextF">
              <button id="Wbutton" class="btn" (click)="weiter()">
                <img
                  src="/assets/icons/icon_arrow_forward.svg"
                  width="50"
                  height="50"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <button
            [@fade]="isOpen1 ? true : false"
            [@falsch]="falsch1 ? true : false"
            [@richtig]="richtig1 ? true : false"
            id="{{ antwort1anzeige }}"
            class="antwort shadow"
            (click)="push($event, 1)"
            data-toggle="modal"
            data-target="#myModal"
          >
            {{ antwort1anzeige }}
          </button>
        </div>
        <div class="col-6">
          <button
            [@fade]="isOpen2 ? true : false"
            [@falsch]="falsch2 ? true : false"
            [@richtig]="richtig2 ? true : false"
            id="{{ antwort2anzeige }}"
            class="antwort shadow"
            (click)="push($event, 2)"
            data-toggle="modal"
            data-target="#myModal"
          >
            {{ antwort2anzeige }}
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <button
            [@fade]="isOpen3 ? true : false"
            [@falsch]="falsch3 ? true : false"
            [@richtig]="richtig3 ? true : false"
            id="{{ antwort3anzeige }}"
            class="antwort shadow"
            name="btn3"
            (click)="push($event, 3)"
            data-toggle="modal"
            data-target="#myModal"
          >
            {{ antwort3anzeige }}
          </button>
        </div>
        <div class="col-6">
          <button
            [@fade]="isOpen4 ? true : false"
            [@falsch]="falsch4 ? true : false"
            [@richtig]="richtig4 ? true : false"
            id="{{ antwort4anzeige }}"
            class="antwort shadow"
            name="btn4"
            (click)="push($event, 4)"
            data-toggle="modal"
            data-target="#myModal"
          >
            {{ antwort4anzeige }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./quiz.component.css'],
  animations: [
    trigger('fade', [
      transition('true => false', [
        animate('0.8s'),
        style({ backgroundColor: '#9CD1F0',}),
      ]),
    ]),
    trigger('falsch', [
      transition('true => false', [
        animate(
          '2s',
          keyframes([style({ backgroundColor: '#E57776', offset: 1,})])),
      ]),
    ]),trigger('falsch', [
      transition('true => false', [
        style({color:'white'})
      ]),
    ]),
    trigger('richtig', [
      transition('true => false', [
        animate('2s', keyframes([style({ backgroundColor: '#91DCB0', offset: 1,})])),
      ]),
    ]),
  ],
})
export class FourAnswersComponent implements OnInit, DoCheck {
  get = firebase.firestore().collection('Quiz');
  showModelBox = true;
  index = 0;
  fragen = [];
  antwort1: string[] = [];
  antwort2: string[] = [];
  antwort3: string[] = [];
  antwort4: string[] = [];
  begruendung = [];
  richtigeantwort: string[] = [];
  docid = [];
  fragenauswahl = [];
  anzeige: string;
  antwort1anzeige: string;
  antwort2anzeige: string;
  antwort3anzeige: string;
  antwort4anzeige: string;
  begruendunganzeige: string;
  indexrouting: number = 0;
  dbpush = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Quiz');
  isOpen1: boolean = true;
  isOpen2: boolean = true;
  isOpen3: boolean = true;
  isOpen4: boolean = true;
  falsch1: boolean = true;
  falsch2: boolean = true;
  falsch3: boolean = true;
  falsch4: boolean = true;
  richtig1: boolean = true;
  richtig2: boolean = true;
  richtig3: boolean = true;
  richtig4: boolean = true;

  constructor(private dataservice: DataService, private quiz: QuizService) {}

  ngOnInit() {
    this.fragenauswahl = this.quiz.getfragenauswahl();
    this.index = this.dataservice.getindexspeichernvier();
    this.get
      .where('type', '==', 'vierAntworten')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.docid.push(doc.id);
          this.fragen.push(doc.data().Frage);
          this.antwort1.push(doc.data().antwort1);
          this.antwort2.push(doc.data().antwort2);
          this.antwort3.push(doc.data().antwort3);
          this.antwort4.push(doc.data().antwort4);
          this.richtigeantwort.push(doc.data().richtig);
          this.begruendung.push(doc.data().begründung);
        });
      });
  }

  ngDoCheck() {
    this.indexrouting = this.dataservice.getquizrouting();
    this.anzeige = this.fragen[this.fragenauswahl[this.index]];
    this.antwort1anzeige = this.antwort1[this.fragenauswahl[this.index]];
    this.antwort2anzeige = this.antwort2[this.fragenauswahl[this.index]];
    this.antwort3anzeige = this.antwort3[this.fragenauswahl[this.index]];
    this.antwort4anzeige = this.antwort4[this.fragenauswahl[this.index]];
    this.begruendunganzeige = this.begruendung[this.fragenauswahl[this.index]];
  }

  push(event, whichbtn: number) {
    this.quiz.adddocid(this.docid[this.fragenauswahl[this.index]]); //Push docid in dataservice
    if (event.target.id == this.antwort1anzeige) {
      this.isOpen1 = false;
    } else if (event.target.id == this.antwort2anzeige) {
      this.isOpen2 = false;
    } else if (event.target.id == this.antwort3anzeige) {
      this.isOpen3 = false;
    } else if (event.target.id == this.antwort4anzeige) {
      this.isOpen4 = false;
    }
    this.dbpush.doc(this.docid[this.fragenauswahl[this.index]]).set({
      antwort: event.target.id,
    });

    setTimeout(() => {
      if (whichbtn == 1) {
        if (
          event.target.id !=
          this.richtigeantwort[this.fragenauswahl[this.index]]
        ) {
          this.falsch1 = false;
        }
      }
      if (whichbtn == 2) {
        if (
          event.target.id !=
          this.richtigeantwort[this.fragenauswahl[this.index]]
        ) {
          this.falsch2 = false;
        }
      }
      if (whichbtn == 3) {
        if (
          event.target.id !=
          this.richtigeantwort[this.fragenauswahl[this.index]]
        ) {
          this.falsch3 = false;
        }
      }
      if (whichbtn == 4) {
        if (
          event.target.id !=
          this.richtigeantwort[this.fragenauswahl[this.index]]
        ) {
          this.falsch4 = false;
        }
      }

      if (
        this.antwort1anzeige ==
        this.richtigeantwort[this.fragenauswahl[this.index]]
      ) {
        if (event.target.id == this.antwort1anzeige) {
          this.richtig1 = false;
        } else if (
          event.target.id !=
          this.richtigeantwort[this.fragenauswahl[this.index]]
        ) {
          this.richtig1 = false; //Button der geklickt wurde muss rot blinken
        }
      }
      if (
        this.antwort2anzeige ==
        this.richtigeantwort[this.fragenauswahl[this.index]]
      ) {
        if (event.target.id == this.antwort2anzeige) {
          this.richtig2 = false;
        } else if (
          event.target.id !=
          this.richtigeantwort[this.fragenauswahl[this.index]]
        ) {
          this.richtig2 = false;
        }
      }
      if (
        this.antwort3anzeige ==
        this.richtigeantwort[this.fragenauswahl[this.index]]
      ) {
        if (event.target.id == this.antwort3anzeige) {
          this.richtig3 = false;
        } else if (
          event.target.id !=
          this.richtigeantwort[this.fragenauswahl[this.index]]
        ) {
          this.richtig3 = false;
        }
      }
      if (
        this.antwort4anzeige ==
        this.richtigeantwort[this.fragenauswahl[this.index]]
      ) {
        if (event.target.id == this.antwort4anzeige) {
          this.richtig4 = false;
        } else if (
          event.target.id !=
          this.richtigeantwort[this.fragenauswahl[this.index]]
        ) {
          this.richtig4 = false;
        }
      }
    }, 1050);

    setTimeout(() => {
      if (
        event.target.id != this.richtigeantwort[this.fragenauswahl[this.index]]
      ) {
        this.showModelBox = false;
      } else {
        this.weiter();
      }
    }, 3050);
  }
  weiter() {
    this.showModelBox = true;
    this.index = this.index + 1;
    this.dataservice.addindexspeichernvier(this.index);
    this.indexrouting = this.indexrouting + 1;
    this.dataservice.addquizrouting(this.indexrouting);
    this.isOpen1 = true;
    this.isOpen2 = true;
    this.isOpen3 = true;
    this.isOpen4 = true;
    this.falsch1 = true;
    this.falsch2 = true;
    this.falsch3 = true;
    this.falsch4 = true;
    this.richtig1 = true;
    this.richtig2 = true;
    this.richtig3 = true;
    this.richtig4 = true;
  }
}
