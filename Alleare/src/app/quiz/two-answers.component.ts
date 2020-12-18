import { Component, DoCheck,  OnInit } from '@angular/core';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';
import { QuizService } from '.././services/quiz.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { promise } from 'protractor';

@Component({
  selector: 'two-answers',
  template: `
    <div *ngIf="!isLoading" class="container">
      <div class="row">
        <div class="card">
          <div class="Fragenstellung">{{ active.fragen }}</div>
        </div>
      </div>

      <!--Popup Fenster-->
      <div
        [hidden]="showModelBox"
        class="modal"
        data-backdrop="false"
        id="myModal"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title"><strong>Begründung</strong></h4>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              {{ active.begruendung }}
            </div>
            <div class="ButtonNextF">
              <button id="Wbutton" class="btn" (click)="forward()">
                <!--Andere id als bei radio.component-->
                <img
                  src="/assets/icons/icon_arrow_forward.svg"
                  width="50"
                  height="50"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--Antwort Buttons-->
      <div class="row">
        <div class="col-6">
          <button
            [@fade]="isOpen1 ? true : false"
            [@falsch]="wrong1 ? true : false"
            [@richtig]="right1 ? true : false"
            data-toggle="modal"
            data-target="#myModal"
            id="{{ active.antworten1 }}"
            class="antwort shadow"
            (click)="push($event, 1)"
          >
            {{ active.antworten1 }}
          </button>
        </div>
        <div class="col-6">
          <button
            [@fade]="isOpen2 ? true : false"
            [@falsch]="wrong2 ? true : false"
            [@richtig]="right2 ? true : false"
            data-toggle="modal"
            data-target="#myModal"
            id="{{ active.antworten2 }}"
            class="antwort shadow"
            (click)="push($event, 2)"
          >
            {{ active.antworten2 }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./quiz.component.css'],
  animations: [
    trigger('fade', [
      transition('true => false', [
        animate('0.8s'),
        style({ backgroundColor: '#9CD1F0'}),
      ]),
    ]),
    trigger('falsch', [
      transition('true => false', [
        animate(
          '2s',
          keyframes([style({ backgroundColor: '#E57776', offset: 1,})])
        ),
      ]),
    ]),
    trigger('richtig', [
      transition('true => false', [
        animate(
          '2s',
          keyframes([style({ backgroundColor: '#91DCB0', offset: 1,})])
        ),
      ]),
    ]),
  ],
})
export class TwoAnswersComponent implements OnInit{
 private get = firebase.firestore().collection('Quiz');
 public showModelBox = true;
 private index = 0;
 private indexrouting = 0;
 private generatedquestions = [];
 private dbpush = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Quiz');
 public isOpen1: boolean = true;
 public isOpen2: boolean = true;
 public wrong1: boolean = true;
 public wrong2: boolean = true;
 public right1: boolean = true;
 public right2: boolean = true;

 public Data:Quiz[]=[];
 public active:Quiz;
 public isLoading=true;
 private clickonce=true;

  constructor(private dataservice: DataService, private quiz: QuizService) {}

  async ngOnInit() {
    this.Data=await this.dbrequest(); //Wartet auf die Db anfrage der Daten
    this.isLoading=false;
    this.generatedquestions = this.quiz. getChosenQuestion();//Random Fragenauswahl aus dem QuizService
    this.indexrouting = this.dataservice.getquizrouting(); //Index übergabe für das Routing in quizcomponent.ts
    this.index = this.dataservice.getindexspeichernzwei(); //Übergabe des Fortschritts
    await this.currentquestion();
  }
 private currentquestion(){
  this.active=this.Data[this.generatedquestions[this.index]] //Aktive Anzeige der Frage
  }

 public async dbrequest():Promise<Quiz[]>{
    let data:Quiz[]=[];
    await this.get
      .where('type', '==', 'zweiAntworten') //Nur Daten des typs zweiAntworten
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          data.push({
            docid: doc.id,
            fragen: doc.data().Frage,
            antworten1: doc.data().antwort1,
            antworten2: doc.data().antwort2,
            richtigeantwort:doc.data().richtig,
            begruendung:doc.data().begründung
          })  
        });
      });
      return data
  }

 public push(event, whichbtn: number) {
   if(this.clickonce==true){//Button kann nur einmal geklickt werden
    this.quiz.adddocid(this.active.docid); //Push docid in dataservice
    if (event.target.id == this.active.antworten1) {
      this.isOpen1 = false;
    } else if (event.target.id == this.active.antworten2) {
      this.isOpen2 = false;
    }
    this.dbpush.doc(this.active.docid).set({
      antwort: event.target.id,
    });
    setTimeout(() => {
      if (whichbtn == 1) {
        if (event.target.id !=this.active.richtigeantwort) {
          this.wrong1 = false;
        }
      }
      if (whichbtn == 2) {
        if (event.target.id !=this.active.richtigeantwort
        ) {
          this.wrong2 = false;
        }
      }
      if (this.active.antworten1 ==this.active.richtigeantwort
      ) {
        if (event.target.id == this.active.antworten1) {
          this.right1 = false;
        } else if (event.target.id !=this.active.richtigeantwort
        ) {
          this.right1 = false; //Button der geklickt wurde muss rot blinken
        }
      }
      if (this.active.antworten2 ==this.active.richtigeantwort
      ) {
        if (event.target.id == this.active.antworten2) {
          this.right2 = false;
        } else if (event.target.id !=this.active.richtigeantwort
        ) {
          this.right2 = false;
        }
      }
    }, 1050);
    setTimeout(() => {
      if (event.target.id != this.active.richtigeantwort) { //Wenn Frage falsch ist, popt eine Begründung auf
        this.showModelBox = false;
      } else {
        this.forward();
      }
    }, 3050); //Timeout, damit die Animationen durchlaufen können
  }
  this.clickonce=false;
  }
 public forward() {
    this.showModelBox = true;
    this.index = this.index + 1;
    this.dataservice.addindexspeichernzwei(this.index);
    this.indexrouting = this.indexrouting + 1;
    this.dataservice.addquizrouting(this.indexrouting);
    this.isOpen1 = true;
    this.isOpen2 = true;
    this.right1 = true;
    this.right2 = true;
    this.wrong1 = true;
    this.wrong2 = true;
  }
}
interface Quiz{ //Interface für die Datenabfrage
    docid:string;
    fragen:string;
    antworten1:string;
    antworten2:string;
    richtigeantwort:string;
    begruendung:string;
}
