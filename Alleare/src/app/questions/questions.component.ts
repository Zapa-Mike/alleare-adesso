import { Component, DoCheck } from '@angular/core';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements DoCheck {
  public verweis = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Versicherungen');
  public fragenkatalog = true;
  public start = false;

  public progressquestions: number = 0;
  public progressquestionprozent: number = 0;
  public fragenlaenge: number;

  constructor(private dataservice: DataService) {
    this.dataservice.getquestionprogress(); // progressbar
    this.dataservice.questionprogress.subscribe((questionprogress) => {
      this.progressquestions = questionprogress;
    });
    firebase
      .firestore()
      .collection('Progressbar')
      .doc('Fragenlänge')
      .get()
      .then((doc) => {
        this.fragenlaenge = doc.data().länge;
      });
  }

  public further() {
    this.dataservice.resetquestionprogress(); // progressbar
    this.dataservice.addquestionprogress(0); // progressbar
    this.verweis.get().then((querysnapshot) => {
      // Löscht Favorisierung bei erneutem Aufruf der Fragenkatalogs
      querysnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
    this.fragenkatalog = false; 
    this.start = true;
  }

  ngDoCheck() {
    // progressbar
    this.progressquestionprozent = 
      (100 * this.progressquestions) / this.fragenlaenge;
  }
}
