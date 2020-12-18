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
  order = ['vier','zwei','vier','zwei','vier','zwei','vier','zwei'];
  showfour: boolean = false;
  showtwo: boolean = false;
  evaluation = false;
  dbanswers = firebase
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
    this.dataservice.addquizrouting(0); //Setzt die Indizes zurück
    this.dataservice.addindexspeichernzwei(0);
    this.dataservice.addindexspeichernvier(0);

    this.dbanswers.get().then((querysnapshot) => { //Löscht QuizAntworten bei erneutem Aufruf
      //Löscht Benutzerantworten, von davor
      querysnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  }
  forward(){ //Ausschalten der Introanzeige
    this.fabvisible=true;
    this.start = true; 
    this.quiz = false; 
  }

  ngDoCheck() {
    this.routingindex = this.dataservice.getquizrouting(); //Wechselt die Anzeige des Quiz, nach der Array Reihenfolge
    if (this.order[this.routingindex] == 'vier') {
      this.showtwo = false;
      this.showfour = true;
    }
    if (this.order[this.routingindex] == 'zwei') {
      this.showtwo = true;
      this.showfour = false;
    }
    if (this.routingindex >= this.order.length) {
      this.showtwo = false;
      this.showfour = false;
      this.evaluation = true;
    }
  }
  novaclick(){
    this.dbanswers.get().then((querysnapshot) => {
      //Löscht Benutzerantworten, von davor
      querysnapshot.forEach((doc) => {
        doc.ref.delete();
      });
  })
}
}
