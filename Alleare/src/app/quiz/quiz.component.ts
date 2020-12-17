import {
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import firebase from 'firebase';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, DoCheck {
  routingindex; // muss von den templates hochgesetzt werden.
  reihenfolge = ['vier','zwei','vier','zwei','vier','zwei','vier','zwei'];
  showfour: boolean = false;
  showtwo: boolean = false;
  evaluation = false;
  dbantworten = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Quiz');
  start =false ;
  quiz = true;
  fabvisible:boolean=false;

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
  forward(){
    this.fabvisible=true;
    this.start = true; 
    this.quiz = false; 
  }

  ngDoCheck() {
    this.routingindex = this.dataservice.getquizrouting();
    if (this.reihenfolge[this.routingindex] == 'vier') {
      this.showtwo = false;
      this.showfour = true;
    }
    if (this.reihenfolge[this.routingindex] == 'zwei') {
      this.showtwo = true;
      this.showfour = false;
    }
    if (this.routingindex >= this.reihenfolge.length) {
      this.showtwo = false;
      this.showfour = false;
      this.evaluation = true;
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
