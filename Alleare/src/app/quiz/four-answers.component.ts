import { Component, DoCheck, OnInit} from '@angular/core';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';
import { keyframes } from '@angular/animations';
import { QuizService } from '.././services/quiz.service';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'four-answers',
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
            id="{{ active.antworten1 }}"
            class="antwort shadow"
            (click)="push($event, 1)"
            data-toggle="modal"
            data-target="#myModal"
          >
            {{ active.antworten1 }}
          </button>
        </div>
        <div class="col-6">
          <button
            [@fade]="isOpen2 ? true : false"
            [@falsch]="wrong2 ? true : false"
            [@richtig]="right2 ? true : false"
            id="{{ active.antworten2 }}"
            class="antwort shadow"
            (click)="push($event, 2)"
            data-toggle="modal"
            data-target="#myModal"
          >
            {{ active.antworten2 }}
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <button
            [@fade]="isOpen3 ? true : false"
            [@falsch]="wrong3 ? true : false"
            [@richtig]="right3 ? true : false"
            id="{{ active.antworten3 }}"
            class="antwort shadow"
            name="btn3"
            (click)="push($event, 3)"
            data-toggle="modal"
            data-target="#myModal"
          >
            {{ active.antworten3 }}
          </button>
        </div>
        <div class="col-6">
          <button
            [@fade]="isOpen4 ? true : false"
            [@falsch]="wrong4 ? true : false"
            [@richtig]="right4 ? true : false"
            id="{{ active.antworten4 }}"
            class="antwort shadow"
            name="btn4"
            (click)="push($event, 4)"
            data-toggle="modal"
            data-target="#myModal"
          >
            {{ active.antworten4 }}
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
        style({ backgroundColor: '#9CD1F0',}),
      ]),
    ]),
    trigger('falsch', [
      transition('true => false', [
        animate(
          '2s',
          keyframes([style({ backgroundColor: '#E57776', offset: 1,})])),
      ]),
    ]),
    trigger('richtig', [
      transition('true => false', [
        animate('2s', keyframes([style({ backgroundColor: '#91DCB0', offset: 1,})])),
      ]),
    ]),
  ],
})
export class FourAnswersComponent implements OnInit{
 private get = firebase.firestore().collection('Quiz');
 public showModelBox = true;
 private index = 0;
 private fragenauswahl = [];
 public indexrouting: number = 0;
 private dbpush = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Quiz');
 public isOpen1: boolean = true;
 public isOpen2: boolean = true;
 public isOpen3: boolean = true;
 public isOpen4: boolean = true;
 public wrong1: boolean = true;
 public wrong2: boolean = true;
 public wrong3: boolean = true;
 public wrong4: boolean = true;
 public right1: boolean = true;
 public right2: boolean = true;
 public right3: boolean = true;
 public right4: boolean = true;
 public Daten:Quiz[]=[];
 public active:Quiz;
 public isLoading=true;
 private clickonce=true;

  constructor(private dataservice: DataService, private quiz: QuizService) {}

 async ngOnInit() {
    this.Daten=await this.dbrequest();
    this.isLoading=false;
    this.fragenauswahl = this.quiz.getfragenauswahl();
    this.indexrouting = this.dataservice.getquizrouting();
    this.index = this.dataservice.getindexspeichernvier();
    this.currentquestion();
  }

 private currentquestion(){
    this.active=this.Daten[this.fragenauswahl[this.index]]
  }

 public async dbrequest():Promise<Quiz[]>{
    let data:Quiz[]=[];
    await this.get
      .where('type', '==', 'vierAntworten')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          data.push({
            docid: doc.id,
            fragen: doc.data().Frage,
            antworten1: doc.data().antwort1,
            antworten2: doc.data().antwort2,
            antworten3: doc.data().antwort3,
            antworten4: doc.data().antwort4,
            richtigeantwort:doc.data().richtig,
            begruendung:doc.data().begründung
          }) 
        });
      });
      return data
    }

 public push(event, whichbtn: number) {
   if(this.clickonce==true){
     this.quiz.adddocid(this.active.docid); //Push docid in dataservice
     if (event.target.id == this.active.antworten1) {
       this.isOpen1 = false;
     } else if (event.target.id == this.active.antworten2) {
       this.isOpen2 = false;
     } else if (event.target.id == this.active.antworten3) {
       this.isOpen3 = false;
     } else if (event.target.id == this.active.antworten4) {
       this.isOpen4 = false;
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
         if (event.target.id !=this.active.richtigeantwort) {
           this.wrong2 = false;
         }
       }
       if (whichbtn == 3) {
         if (event.target.id !=this.active.richtigeantwort) {
           this.wrong3 = false;
         }
       }
       if (whichbtn == 4) {
         if (event.target.id !=this.active.richtigeantwort) {
           this.wrong4 = false;
         }
       }
 
       if (this.active.antworten1 ==this.active.richtigeantwort) {
         if (event.target.id == this.active.antworten1) {
           this.right1 = false;
         } else if (event.target.id !=this.active.richtigeantwort
         ) {
           this.right1 = false; //Button der geklickt wurde muss rot blinken
         }
       }
       if (this.active.antworten2 ==this.active.richtigeantwort) {
         if (event.target.id == this.active.antworten2) {
           this.right2 = false;
         } else if (event.target.id !=this.active.richtigeantwort
         ) {
           this.right2 = false;
         }
       }
       if (this.active.antworten3 ==this.active.richtigeantwort) {
         if (event.target.id == this.active.antworten3) {
           this.right3 = false;
         } else if (event.target.id !=this.active.richtigeantwort
         ) {
           this.right3 = false;
         }
       }
       if (this.active.antworten4 ==this.active.richtigeantwort) {
         if (event.target.id == this.active.antworten4) {
           this.right4 = false;
         } else if (event.target.id !=this.active.richtigeantwort
         ) {
           this.right4 = false;
         }
       }
     }, 1050);
 
     setTimeout(() => {
       if (event.target.id != this.active.richtigeantwort) {
         this.showModelBox = false;
       } else {
         this.forward();
       }
     }, 3050);
   }
   this.clickonce=false;
  }
 public forward() {
    this.showModelBox = true;
    this.index = this.index + 1;
    this.dataservice.addindexspeichernvier(this.index);
    this.indexrouting = this.indexrouting + 1;
    this.dataservice.addquizrouting(this.indexrouting);
    this.isOpen1 = true;
    this.isOpen2 = true;
    this.isOpen3 = true;
    this.isOpen4 = true;
    this.wrong1 = true;
    this.wrong2 = true;
    this.wrong3 = true;
    this.wrong4 = true;
    this.right1 = true;
    this.right2 = true;
    this.right3 = true;
    this.right4 = true;
  }
}

interface Quiz{
  docid:string;
  fragen:string;
  antworten1:string;
  antworten2:string;
  antworten3:string;
  antworten4:string;
  richtigeantwort:string;
  begruendung:string;
}