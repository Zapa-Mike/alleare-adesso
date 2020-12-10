import {
  Component,
  DoCheck,
  OnInit,
  ɵallowSanitizationBypassAndThrow,
} from '@angular/core';
import firebase from 'firebase';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, DoCheck {
  switch: boolean = false;
  routingindex; // muss von den templates hochgesetzt werden.
  anzeige: string;
  reihenfolge = [
    'vier',
    'zwei',
    'vier',
    'zwei',
    'vier',
    'zwei',
    'vier',
    'zwei',
  ];
  anzeigevier: boolean = false;
  anzeigezwei: boolean = false;
  auswertung = false;
  dbantworten = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Quiz');
  antworten = [];
  richtigeantworten = [];
  punkte: number = 0;
  antwortenid = [];
  jalla = true;
  dbrichtig = firebase.firestore().collection('Quiz');
  start =false ;
  quiz = true;

  constructor(private dataservice: DataService) {
  }

  ngOnInit() {
    this.dataservice.addquizrouting(0);
    this.dataservice.addindexspeichernzwei(0);
    this.dataservice.addindexspeichernvier(0);

    this.dbantworten.get().then((querysnapshot) => {
      //Löscht Benutzerantworten, von davor
      querysnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  }
  weiter(){
    this.start = true; 
    this.quiz = false; 
  }

  ngDoCheck() {
    this.routingindex = this.dataservice.getquizrouting();
    if (this.reihenfolge[this.routingindex] == 'vier') {
      this.anzeigezwei = false;
      this.anzeigevier = true;
    }
    if (this.reihenfolge[this.routingindex] == 'zwei') {
      this.anzeigezwei = true;
      this.anzeigevier = false;
    }
    if (this.routingindex >= this.reihenfolge.length) {
      this.anzeigezwei = false;
      this.anzeigevier = false;
      this.auswertung = true;
    }
  }
  novaclick(){
    this.dbantworten.get().then((querysnapshot) => {
      //Löscht Benutzerantworten, von davor
      querysnapshot.forEach((doc) => {
        doc.ref.delete();
      });
  })
}
}
