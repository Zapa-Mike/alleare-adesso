import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';
import { Data } from '@angular/router';

@Component({
  selector: 'evaluation-quiz',
  template: `
    <br />
    <br />
    <br />
    {{ punkte }} Punkte
  `,
  styleUrls: ['./quiz.component.css'],
})
export class evaluationComponent implements OnInit {
  dbpush = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Quiz');
  dbantworten = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Quiz');
  antworten = [];
  richtigeantworten = [];
  punkte: number = 0;
  antwortenid = [];
  dbrichtig = firebase.firestore().collection('Quiz');

  constructor(private dataservice: DataService) {}

  ngOnInit() {
    this.dbantworten
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.antwortenid.push(doc.id);
          this.antworten.push(doc.data().antwort);
        });
      })
      .then(() => {
        for (let y = 0; y < this.antwortenid.length; y++) {
          this.dbrichtig
            .doc(this.antwortenid[y])
            .get()
            .then((doc) => {
              this.richtigeantworten.push(doc.data().richtig);
            });
        }
      });
    setTimeout(() => {
      for (let i = 0; i < this.antwortenid.length; i++) {
        if (this.antworten[i] == this.richtigeantworten[i]) {
          this.punkte = this.punkte + 1;
        }
      }
    }, 1300); //Muss noch überarbeitet werden.
  }
}
