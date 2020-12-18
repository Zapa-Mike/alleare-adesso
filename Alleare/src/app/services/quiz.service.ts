import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  questions = [];
  doclength = 0;
  arr = [];
  get = firebase.firestore().collection('Quiz');
  docid = [];

  constructor() {
    this.get
      .where('type', '==', 'vierAntworten')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach(() => {
          this.doclength = this.doclength + 1; // anzahl an Fragen mit vier Antworten wird ermittelt 
        });
      })
      .then(() => {
        for (let i = 0; i < this.doclength; i++) {// pusht Zahlen einzelnt bis zur Fragenanzahl ins Array (1;2;3;4;...)
          this.arr.push(i); 
        }
        this.arr.sort(() => {
          return Math.random() - 0.5; // Array mit Zahlen wird zufällig sortiert 
        });
        for (let z = 0; z < 4; z++) {
          this.questions.push(this.arr[z]);  // ausgewählte Fragen werden für das Quiz hinterlegt 
        }
      });
  }

  getChosenQuestion() {
    return this.questions;
  }
  adddocid(docid1) {
    this.docid.push(docid1);
  }
  getdocid() {
    return this.docid;
  }
  deletedocid() {
    this.docid = [];
  }
}
