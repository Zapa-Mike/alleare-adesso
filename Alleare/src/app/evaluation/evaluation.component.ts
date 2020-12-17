import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { snapshotChanges } from '@angular/fire/database';
import firebase from 'firebase';
import { of } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'],
})
export class EvaluationComponent implements OnInit {
  Versicherungspriorisierung = [];
  Versicherungsanzeige5 = [];
  db = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Fragenkatalog');
  db2 = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'));
  db1 = firebase.firestore();
  standardversicherungen = ['Haftpflichtversicherung', 'Hausratversicherung'];
  spinneranzeige:boolean=true;

  constructor(private dataservice:DataService) {}

 ngOnInit() {
   this.dataservice.deleteindexoption();//Löscht Index des Fragenkatalogs
   this.dataservice.deleteindexstory();//Löscht Index des Fragenkatalogs
      for (let i = 0; i < this.standardversicherungen.length; i++) {
        this.db1
          .collection('Versicherungen')
          .doc(this.standardversicherungen[i])
          .get()
          .then(function (doc) {
            perVersicherung.push(doc.id);
            Versicherungsprioritaet.push(doc.data().Priorisierung);
          });
      }
      this.db
        .where('antwort', 'in', [
          'ja',
          'Arbeitnehmer',
          'Selbstständig',
          'Pferd',
          'Hund',
          'andere',
        ])
        .get()
        .then((querysnapshot) => {
          querysnapshot.forEach((doc) => {
            firebase
              .firestore()
              .collection('Fragenkatalog')
              .doc(doc.id)
              .get()
              .then((doc) => {
                perVersicherung.push(doc.data().versicherung);
                var versicherung = doc.data().versicherung;
                if(versicherung!=undefined)
                {
                  this.db1
                  .collection('Versicherungen')
                  .doc(versicherung)
                  .get()
                  .then((doc) => {
                    Versicherungsprioritaet.push(doc.data().Priorisierung);
                  }).then(()=>{
                    this.sort();
                    this.spinneranzeige=false;
                  });
                }
              });
          });
        });
  }
  infofav(){
    this.dataservice.setfav(true);
  }

  sort() {
    var temp;
    var temp2;
    var array = [];

    const distinctArray = Versicherungsprioritaet.filter(
      //Löscht alle doppelten Felder
      (n, i) => Versicherungsprioritaet.indexOf(n) === i
    );
    var Versicherungsanzeige = distinctArray.filter(function (el) {
      //Löscht alle Felder die undefined sind
      return el != undefined;
    });
    const distinctArray1 = perVersicherung.filter(
      (n, i) => perVersicherung.indexOf(n) === i
    );
    var Versicherungsanzeige1 = distinctArray1.filter(function (el) {
      return el != undefined;
    });

    for (let y = 0; y < Versicherungsanzeige.length; y++) {
      temp = Versicherungsanzeige[y]; //Prio Wert wird temp mitgegeben
      temp2 = Versicherungsanzeige1[y]; //Versicherung wird temp2 mitgegeben
      array[temp] = temp2; //Versicherung wird in das prioFeld geschrieben
      this.Versicherungspriorisierung = array.filter(function (el) {
        return el != null;
      });
    }
    if (this.Versicherungspriorisierung.length <= 5) {
      for (let z = 0; z < this.Versicherungspriorisierung.length; z++) {
        this.Versicherungsanzeige5[z] = this.Versicherungspriorisierung[z]; // Die besten 5 werden ausgegeben
        this.db2
          .collection('Versicherungen')
          .doc(this.Versicherungsanzeige5[z])
          .set({
            Favorisierung: true,
          });
      }
    } else {
      for (let z = 0; z <= 4; z++) {
        this.Versicherungsanzeige5[z] = this.Versicherungspriorisierung[z]; // Die besten 5 werden ausgegeben
        this.db2
          .collection('Versicherungen')
          .doc(this.Versicherungsanzeige5[z])
          .set({
            Favorisierung: true,
          });
      }
    }
  }
}
let perVersicherung: any[] = [];
let Versicherungsprioritaet: any[] = [];
