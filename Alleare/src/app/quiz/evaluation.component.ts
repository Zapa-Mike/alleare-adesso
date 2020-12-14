import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { element } from 'protractor';

@Component({
  selector: 'evaluation-quiz',
  template: `
    <div class="Titel2 text-center">
      <h1>Dein Ergebnis:</h1>
    </div>

    <!--Auswertung Kreis anzeige-->
    <div class="single-chart">
      <circle-progress
        percent="{{ this.percent }}"
        [outerStrokeGradientStopColor]="'#36d1dc'"
        [outerStrokeGradientStopColor]="'#36d1dc'"
        [outerStrokeColor]="'#4ca3e1'"
        [innerStrokeColor]="'#36d1dc'"
        [showTitle]="false"
        [showUnits]="false"
        subtitle="{{ punkte }}/{{ antworten.length }}"
      ></circle-progress>
    </div>
    <div class="cardAuswertung Texte">
      <!--Text wie: Yeah! Fast alles richtig beantwortet. Basierend auf Ergebnis anderen Text anzeigen-->
      <label class="KommentarAuswertung"
        >Yeah! Du hast das Quiz geschafft</label
      >

      <!-- Button trigger modal -->
      <button
        type="button"
        class="LinkMeineAntworten btn-link"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Meine Antworten ansehen
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header contentimheader">
              <p class="ausrichtung"><b>Auswertung</b></p>
              <button
                id="buttonverschieben"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              *ngFor="let ergebnis of richtigfalsch; let i = index"
              class="modal-body"
            >
              <p style="display:inline">
                <b>Frage {{ i + 1 }} : </b> 
              </p>
               <p *ngIf= "checktruth[i] ; else ShowRed"  id="richtig" style="display:inline">{{ ergebnis }}</p> 
            
            <ng-template #ShowRed>
              <p id="falsch" style="display:inline">{{ ergebnis }}</p> 
            </ng-template>
            
            
            </div>
          </div>
        </div>
      </div>

      <div class="gridButtons">
        <button
          type="btn"
          class="btnAuswertung shadow rounded-pill"
          (click)="reload()"
        >
          Neues Quiz
        </button>
        <button
          type="btn"
          class="btnAuswertung shadow rounded-pill"
          routerLink="/infos"
        >
          Zu Infos
        </button>
      </div>
      <br />
    </div>
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
  richtigfalsch = [];
  index: number = 0;
  percent: number = 0;
  checktruth : boolean[]=[];

  constructor() {}

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
      //const gruen = (document.getElementById('richtig')
       // .innerText as unknown) as HTMLInputElement;
      // gruen.setAttribute("style", "color:green;");
      //document.getElementById('richtig').innerText;

      for (let i = 0; i < this.antwortenid.length; i++) {
        if (this.antworten[i] == this.richtigeantworten[i]) {
          this.punkte = this.punkte + 1;
          this.richtigfalsch[i] = 'Richtig';
          this.checktruth[i]= true;

        } else if (this.antworten[i] != this.richtigeantworten[i]) {
          this.richtigfalsch[i] = 'Falsch';
          this.checktruth[i] = false;
        }
      }

      this.percent = this.percentageCalculator();
    }, 1000);
    //Muss noch überarbeitet werden.
  }
  public reload() {
    location.reload();
  }
  public percentageCalculator() {
    const p = (100 / this.antworten.length) * this.punkte;
    return p;
  }
}
