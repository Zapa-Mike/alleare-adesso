import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';
import { Data } from '@angular/router';
import { query } from '@angular/animations';
import { domainToUnicode } from 'url';
import { QuizService } from '.././services/quiz.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'four-answers',
  template: `
    <div class="card">
      <div class="Fragenstellung">{{ anzeige }}</div>
    </div>
    <div class="grid-containerAntworten">
      <button [@fade]="isOpen1 ? true : false"
        id="{{ antwort1anzeige }}"
        class="antwort shadow"
        (click)="push($event)"
      >
        {{ antwort1anzeige }}
      </button>
      <button [@fade]="isOpen2 ? true : false"
        id="{{ antwort2anzeige }}"
        class="antwort shadow"
        (click)="push($event)"
      >
        {{ antwort2anzeige }}
      </button>
      <button [@fade]="isOpen3 ? true : false"
        id="{{ antwort3anzeige }}"
        class="antwort shadow"
        (click)="push($event)"
      >
        {{ antwort3anzeige }}
      </button>
      <button [@fade]="isOpen4 ? true : false"
        id="{{ antwort4anzeige }}"
        class="antwort shadow"
        (click)="push($event)"
      >
        {{ antwort4anzeige }}
      </button>
    </div>
  `,
  styleUrls: ['./quiz.component.css'],
  animations:[
    trigger('fade',[
      transition('true => false',[
        animate('0.7s'),
        style({backgroundColor:'#9CD1F0',
        'color':'#F2F9FD'
      })
      ])
    ])
  ]
})
export class FourAnswersComponent implements OnInit, DoCheck {
  get = firebase.firestore().collection('Quiz');
  index = 0;
  fragen = [];
  antwort1: string[] = [];
  antwort2: string[] = [];
  antwort3: string[] = [];
  antwort4: string[] = [];
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
  isOpen1:boolean=true;
  isOpen2:boolean=true;
  isOpen3:boolean=true;
  isOpen4:boolean=true;

  constructor(private dataservice: DataService, private quiz:QuizService) {}

  ngOnInit() {

    this.fragenauswahl=this.quiz.getfragenauswahl();
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
        });
      })
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
    if(event.target.id==this.antwort1anzeige){
      this.isOpen1=false;
    }
    else if(event.target.id==this.antwort2anzeige){
      this.isOpen2=false;
    }
    else if(event.target.id==this.antwort3anzeige){
      this.isOpen3=false;
    }
    else if(event.target.id==this.antwort4anzeige)
    {
      this.isOpen4=false;
    }
    this.dbpush.doc(this.docid[this.fragenauswahl[this.index]]).set({
      antwort: event.target.id,
    });

    setTimeout(() => {
      this.index = this.index + 1;
      this.dataservice.addindexspeichernvier(this.index);
      this.indexrouting = this.indexrouting + 1;
      this.dataservice.addquizrouting(this.indexrouting);
      this.isOpen1=true;
      this.isOpen2=true;
      this.isOpen3=true;
      this.isOpen4=true;
    }, 700);
  }
}
