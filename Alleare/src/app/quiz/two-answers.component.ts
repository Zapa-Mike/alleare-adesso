import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';
import { QuizService } from '.././services/quiz.service';
import { Data } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'two-answers',
  template: `
  <div class="container">
  <div class="row">
    <div class="card">
      <div class="Fragenstellung">{{ anzeige }}</div>
    </div>
</div>
<div class="row">
      <div class="col-6" >
      <button [@fade]="isOpen1 ? true : false"
      [@falsch]="falsch1 ? true : false"
      [@richtig]="richtig1 ? true: false"
        id="{{ antwort1anzeige }}"
        class="antwort shadow"
        (click)="push($event,1)"
      >
        {{ antwort1anzeige }}
      </button>
</div>
      <div class="col-6" >
      <button [@fade]="isOpen2 ? true : false"
      [@falsch]="falsch2 ? true : false"
      [@richtig]="richtig2 ? true: false"
        id="{{ antwort2anzeige }}"
        class="antwort shadow"
        (click)="push($event,2)"
      >
        {{ antwort2anzeige }}
      </button>
</div>
</div>
</div>
  `,
  styleUrls: ['./quiz.component.css'],
  animations:[
    trigger('fade',[
      transition('true => false',[
        animate('0.8s'),
        style({backgroundColor:'#9CD1F0',
        'color':'#F2F9FD'
      })
      ])
    ]),
    trigger('falsch',[
      transition('true => false',[
        animate("2s", keyframes([
          style({ backgroundColor: "red", offset: 1 }),
        ]))
      ])
    ]),trigger('richtig',[
      transition('true => false',[
        animate("2s", keyframes([
          style({ backgroundColor: "green", offset: 1 }),
        ]))
      ])
    ])
  ]
})
export class TwoAnswersComponent implements OnInit, DoCheck {
  get = firebase.firestore().collection('Quiz');
  fragen = [];
  antworten1: string[] = [];
  antworten2: string[] = [];
  index = 0;
  indexrouting = 0;
  fragenauswahl = [];
  anzeige: string;
  docid = [];
  antwort1anzeige: string;
  antwort2anzeige: string;
  richtigeantwort=[];
  dbpush = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Quiz');
  isOpen1:boolean=true;
  isOpen2:boolean=true;
  falsch1:boolean=true;
  falsch2:boolean=true;
  richtig1:boolean=true;
  richtig2:boolean=true;

  constructor(private dataservice: DataService, private quiz:QuizService) {}

  ngOnInit() {
    this.fragenauswahl=this.quiz.getfragenauswahl();
    this.index = this.dataservice.getindexspeichernzwei();
    this.get
      .where('type', '==', 'zweiAntworten')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.docid.push(doc.id);
          this.fragen.push(doc.data().Frage);
          this.antworten1.push(doc.data().antwort1);
          this.antworten2.push(doc.data().antwort2);
          this.richtigeantwort.push(doc.data().richtig);
        });
      })
  }

  ngDoCheck() {
    this.indexrouting = this.dataservice.getquizrouting();
    this.anzeige = this.fragen[this.fragenauswahl[this.index]];
    this.antwort1anzeige = this.antworten1[this.fragenauswahl[this.index]];
    this.antwort2anzeige = this.antworten2[this.fragenauswahl[this.index]];
  }

  push(event,whichbtn:number) {
    if(event.target.id==this.antwort1anzeige){
      this.isOpen1=false;
    }
    else if(event.target.id==this.antwort2anzeige){
      this.isOpen2=false;
    }
    this.dbpush.doc(this.docid[this.fragenauswahl[this.index]]).set({
      antwort: event.target.id,
    });

    setTimeout(()=>{
      if(whichbtn==1){
        if(event.target.id!=this.richtigeantwort[this.fragenauswahl[this.index]]){
          this.falsch1=false;
        }
      }
      if(whichbtn==2){
        if(event.target.id!=this.richtigeantwort[this.fragenauswahl[this.index]]){
          this.falsch2=false;
        }
      }
      if(this.antwort1anzeige==this.richtigeantwort[this.fragenauswahl[this.index]]){
        if(event.target.id==this.antwort1anzeige){
          this.richtig1=false;
        }else if(event.target.id!=this.richtigeantwort[this.fragenauswahl[this.index]])
        {
           this.richtig1=false; //Button der geklickt wurde muss rot blinken
      }
    }
      if(this.antwort2anzeige==this.richtigeantwort[this.fragenauswahl[this.index]]){
        if(event.target.id==this.antwort2anzeige){
          this.richtig2=false;
        }else if(event.target.id!=this.richtigeantwort[this.fragenauswahl[this.index]]) { this.richtig2=false;}
      }
    },1050)
    
    setTimeout(() => {
      this.index = this.index + 1;
      this.dataservice.addindexspeichernzwei(this.index);
      this.indexrouting = this.indexrouting + 1;
      this.dataservice.addquizrouting(this.indexrouting);
      this.isOpen1=true;
      this.isOpen2=true;
      this.richtig1=true;
      this.richtig2=true;
      this.falsch1=true;
      this.falsch2=true;
    }, 3050);
  }
}
