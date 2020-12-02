import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';
import { Data } from '@angular/router';

@Component({
  selector: 'two-answers',
  template: `
  <div class="cardBehauptung">
      <div class="Fragenstellung">{{anzeige}}</div>
    </div>
    <div class="grid-containerBehauptung">
      <button id={{antwort1anzeige}} class="antwort shadow" (click)="push($event)">{{antwort1anzeige}}</button>
      <button id={{antwort2anzeige}} class="antwort shadow" (click)="push($event)">{{antwort2anzeige}}</button>
    </div>
    <div class="col rowVZ">
      <button id="Vbutton" class="btn">
        <img
          src="/assets/icons/icon_arrow_forward.svg"
          width="50"
          height="50"
          (click)="weiter()"
        />
      </button>
      <button id="Zbutton" class="btn">
        <img src="/assets/icons/icon_arrow_back.svg" width="50" height="50" />
      </button>
    </div>

    `,
  styleUrls: ['./quiz.component.css'],
})
export class TwoAnswersComponent implements OnInit, DoCheck {
  get=firebase.firestore().collection('Quiz');
  fragen=[];
  antworten1:string[]=[];
  antworten2:string[]=[];
  index=0;
  indexrouting=0;
  fragenauswahl=[];
  anzeige:string;
  doclength:number=0;
  docid=[];
  antwort1anzeige:string;
  antwort2anzeige:string;
  dbpush=firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Quiz');

  constructor(private dataservice: DataService) {

  }

  ngOnInit() {
    this.index=this.dataservice.getindexspeichernzwei();
    this.get.where('type','==','zweiAntworten').get().then((querysnapshot)=>{
      querysnapshot.forEach((doc)=>{
    this.docid.push(doc.id);
    this.doclength=this.doclength+1;
    this.fragen.push(doc.data().Frage);
    this.antworten1.push(doc.data().antwort1)
    this.antworten2.push(doc.data().antwort2)
      })
    }).then(()=>{
      for(let i=0;i<4;i++){
        do{
          this.fragenauswahl[i] = Math.floor(Math.random() * this.doclength + 0).toString();
        }while(this.fragenauswahl.includes(i)==true);
      }
    })
  }

    ngDoCheck() 
    {
    this.indexrouting=this.dataservice.getquizrouting();
    this.anzeige=this.fragen[this.fragenauswahl[this.index]]
    this.antwort1anzeige=this.antworten1[this.fragenauswahl[this.index]]
    this.antwort2anzeige=this.antworten2[this.fragenauswahl[this.index]]
    }

    push(event){
      this.dbpush.doc(this.docid[this.fragenauswahl[this.index]]).set({
        antwort:event.target.id
      })
    }

    weiter()
    {
      this.index=this.index+1;
      this.dataservice.addindexspeichernzwei(this.index);
      this.indexrouting=this.indexrouting+1;
      this.dataservice.addquizrouting(this.indexrouting);
    }

  }

 
