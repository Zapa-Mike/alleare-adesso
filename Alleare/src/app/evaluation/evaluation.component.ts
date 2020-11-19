import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { of } from 'rxjs';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'],
})
export class EvaluationComponent implements OnInit {
  
  Versicherungen = ['','Haftpflichtversicherung','Hausratversicherung','Rechtsschutz','','Wohngebäudeversicherung','Kfz-Versicherung','Kfz-Versicherung',
  '','','','Reiseversicherung','private Unfallversicherung','','Wohngebäudeversicherung','Tier-Haftpflichtversicherung','','',
  ];
  priorisierung = [];
  Versicherungspriorisierung = [];
  Versicherungsanzeige5=[];
  db = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Fragenkatalog');
  db1 = firebase.firestore();
  constructor() {

  }

ngOnInit() {
    for (let i = 1; i <= 17; i++) {
      if ( i == 4 || i == 8 || i == 9 || i == 10 || i == 13 || i == 16 || i == 17) { //mach nix
      } 
      if(i==1|| i==2|| i==5|| i==6 || i==7 || i==11 || i==12 || i==14 || i==15){

        this.db.doc('Frage' + i.toString().padStart(2, '')).get().then((doc) => {
            //Haft und Hausrat werden immer mitgegeben
            this.db1.collection('Versicherungen')
                .doc('Haftpflichtversicherung')
                .get()
                .then(function (doc) {
                  perVersicherung.push(doc.id);
                  Versicherungsprioritaet.push(doc.data().Priorisierung);
                });
                this.db1.collection('Versicherungen')
                .doc('Hausratversicherung')
                .get()
                .then(function (doc) {
                  perVersicherung.push(doc.id);
                  Versicherungsprioritaet.push(doc.data().Priorisierung);
                });
            if (doc.data()._ == 'Arbeitnehmer' ||doc.data()._ == 'Selbststaendig') {
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
              this.db1.collection('Versicherungen').doc(this.Versicherungen[i]).get().then(function (doc) {
                  perVersicherung.push(doc.id);
                  Versicherungsprioritaet.push(doc.data().Priorisierung);
                });
            }
          });
      }
        else if(i==3){// Rechtschutz muss mit Nein beantwortet werden
          this.db.doc('Frage' + i.toString().padStart(2, '')).get().then((doc) => {
            if(doc.data()._=='nein')
            {
              this.db1.collection('Versicherungen').doc(this.Versicherungen[i]).get().then(function (doc) {
                  perVersicherung.push(doc.id);
                  Versicherungsprioritaet.push(doc.data().Priorisierung);
                });
            }
          });
      }
    }
    console.log(perVersicherung);
    console.log(Versicherungsprioritaet);
    setTimeout(() =>{
      this.sort();//Bessere Methode mit asnyc await promise später machen!
    }, 1500);
  }

async sort() {
    var temp;
    var temp2;
    var array = [];

    const distinctArray = Versicherungsprioritaet.filter( //Löscht alle Empty Felder
      (n, i) => Versicherungsprioritaet.indexOf(n) === i);
    var Versicherungsanzeige = distinctArray.filter(function (el) { //Sortiert doppelte Versicherungen aus
      return el != null;
    });
    const distinctArray1 = perVersicherung.filter(
      (n, i) => perVersicherung.indexOf(n) === i);
    var Versicherungsanzeige1 = distinctArray1.filter(function (el) {
      return el != null;
    });

    for (let y = 0; y <=10; y++) {
      temp = Versicherungsanzeige[y]; //Prio Wert wird temp mitgegeben
      temp2 = Versicherungsanzeige1[y]; //Versicherung wird temp2 mitgegeben
      array[temp] = temp2; //Versicherung wird in das prioFeld geschrieben
      this.Versicherungspriorisierung = array.filter(function (el) {
        return el != null;
      });
    }
    for(let z=0;z<=4;z++){
      this.Versicherungsanzeige5[z]=this.Versicherungspriorisierung[z]; // Die besten 5 werden ausgegeben
    }
    this.Versicherungsanzeige5 = this.Versicherungsanzeige5.filter(function (el) {//Wenn weniger als 5 Versicherungen existieren, dann lösch wieder alle empty Felder
      return el != null;
    })
  }
}
let perVersicherung: any[] = [];
let Versicherungsprioritaet: any[] = [];
