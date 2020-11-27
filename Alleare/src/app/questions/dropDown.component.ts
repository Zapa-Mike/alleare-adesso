import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';


@Component({
  selector: 'dropDown',
  template: `
    <body>
      <div class="card">
        <div class="ImageStory">{{ anzeige }}</div>
        <div class="btn-group bundesliste">
          <button
            type="button"
            class="btn DropdownB dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            id="Bundestext"
          >
            <a>Bundesland</a>
          </button>

          <div class="dropdown-menu" id="drop">
            <!--Event fragt geklickte Id ab und setzt diese in die DB-->
            <a
              *ngFor="let land of Bundesland"
              id="{{ land }}"
              class="dropdown-item"
              (click)="setLand($event)"
            >
              {{ land }}
            </a>
          </div>
        </div>
      </div>

      <div class="col rowVZ">
        <button
          id="Vbutton"
          class="btn"
          routerLink="/evaluation"
          (click)="weiter()"
        >
          <img
            src="/assets/icons/icon_arrow_forward.svg"
            width="50"
            height="50"
          />
        </button>
        <button id="Zbutton" class="btn" (click)="zurueck()">
          <img src="/assets/icons/icon_arrow_back.svg" width="50" height="50" />
        </button>
      </div>
      <div class="d-flex Nova justify-content-end fixed-bottom">
        <img
          src="/assets/nova/nova_intro_rechts.png"
          width="100"
          height="100"
          id="NovaImage"
        />
      </div>
    </body>
  `,
  styleUrls: ['./questions.component.css'],
})
export class DropDownComponent implements OnInit, DoCheck {
  Bundesland = [];
  index1:number;

  dbget = firebase.firestore().collection('Bundeslaender'); //in der Collection sind in den Docs die einzelnen Bundesländer abgespeichert
  index: number = 0; // dient zum Hochzähle und wechseln der Fragen
  anzeige: string; // Zeigt Frage auf der Oberfläche an
  fragenliste = []; // hier werden alle Fragen mit dem Typ Liste abgespeichert
  dbgetFrage = firebase.firestore().collection('Fragenkatalog'); // Fragt alle Fragen in unserem Fragenkatalog ab, damit spaeter die Fragen mit dem Type "liste" abgefangen werden können

  constructor(private dataservice: DataService) {
    // es werden alle Dokumente durchgeschaut und die welche den typen "liste" besitzen werden in ein das Array "fragenliste" gespeichert
    this.dbgetFrage
      .where('type', '==', 'liste')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.fragenliste.push(doc.data()._);
        });
      });

  }

  // sobald auf ein Bundesland geklickt wird, wird diese Funktion aufgerufen.
  // Funktion erkennt die ID der gelickten Auswahl und pusht diese in DB
  setLand(event) {
    let title: string = event.target.id;
    firebase
      .firestore()
      .collection('Benutzer')
      .doc(localStorage.getItem('hans'))
      .collection('Fragenkatalog')
      .doc('Frage17')
      .set({
        _: title,
      });
  }

  // dient zum Anzeigen der aktuellen Frage auf der Oberfläche
  ngDoCheck() {
    this.anzeige = this.fragenliste[this.index];
  }
  // beim Aufruf werden alle Bundeslaender in das "Bundesland" Array gespeichert
  // dient später für die Befüllung des DropDowns
  ngOnInit() {
    this.dbget.get().then((querysnapshot) => {
      querysnapshot.forEach((doc) => {
        this.Bundesland.push(doc.data()._);
      });
    });
  }
  // index wird hochgezählt beim weiter klicken -> nächste Frage wird aufgerufen
  weiter() {
    this.index++;
  }
  // index wird runtergesetzt beim zurueck klicken -> vorherige Frage wird aufgerufen
  zurueck() {
    this.index--;
    this.dataservice.sendIndexrouting2(1);
  }
}
