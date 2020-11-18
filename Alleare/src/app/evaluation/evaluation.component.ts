import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'],
})
export class EvaluationComponent implements OnInit {
  Versicherungen = [
    '',
    'Haftpflichtversicherung',
    'Hausratversicherung',
    'Rechtsschutz',
    '',
    'Wohngebäudeversicherung',
    'Kfz-Versicherung',
    'Kfz-Versicherung',
    '',
    '',
    '',
    'Reiseversicherung',
    'private Unfallversicherung',
    '',
    'Wohngebäudeversicherung',
    'Tier-Haftpflichtversicherung',
    '',
    '',
  ];
  priorisierung = [];
  Versicherungsanzeige = [];
  db = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Fragenkatalog');
  db1 = firebase.firestore();
  constructor() {}

  ngOnInit(): void {
    for (let i = 1; i <= 17; i++) {
      if ( i == 4 || i == 8 || i == 9 || i == 10 
           || i == 13 || i == 16 || i == 17
      ) {
      } else {
        this.db
          .doc('Frage' + i.toString().padStart(2, ''))
          .get()
          .then((doc) => {
            //Antworten des Users
            if (
              doc.data()._ == 'Arbeitnehmer' ||
              doc.data()._ == 'Selbststaendig'
            ) {
              this.db1
                .collection('Versicherungen')
                .doc('Berufsunfähigkeitsversicherung')
                .get()
                .then(function (doc) {
                  perVersicherung.push(doc.id);
                  Versicherungsprioritaet.push(doc.data().Priorisierung);
                });
            }
            if (
              doc.data()._ == 'ja' || doc.data()._ == 'Eigentum' || doc.data()._ == 'Arbeitnehmer' ||
              doc.data()._ == 'Selbststaendig' || doc.data()._ == 'Pferd' || doc.data()._ == 'Hund' || doc.data()._ == 'Andere'
            ) {
              //if Prio ist schon gegeben, dann nicht nochmal die geschichten in das Array pushen
              this.db1
                .collection('Versicherungen')
                .doc(this.Versicherungen[i])
                .get()
                .then(function (doc) {
                  perVersicherung.push(doc.id);
                  Versicherungsprioritaet.push(doc.data().Priorisierung);
                });
            }
          });
      }
    }
    console.log(perVersicherung);
    console.log(Versicherungsprioritaet);
    setTimeout(() => {
      this.sort();
    }, 1500);
  }
  sort() {
    var temp;
    var temp2;
    var array = [];

    const distinctArray = Versicherungsprioritaet.filter(
      (n, i) => Versicherungsprioritaet.indexOf(n) === i
    );
    console.dir(distinctArray);
    const distinctArray1 = perVersicherung.filter(
      (n, i) => perVersicherung.indexOf(n) === i
    );
    console.dir(distinctArray1);

    for (let y = 0; y <= 4; y++) {
      temp = distinctArray[y]; //Prio Wert wird temp mitgegeben
      temp2 = distinctArray1[y];
      array[temp] = temp2;
      this.Versicherungsanzeige = array.filter(function (el) {
        return el != null;
      });
    }
  }
}
let perVersicherung: any[] = [];
let Versicherungsprioritaet: any[] = [];
