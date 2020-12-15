import { ObserversModule } from '@angular/cdk/observers';
import { Injectable, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  fragenauswahl=[];
  doclength=0;
  arr=[];
  get = firebase.firestore().collection('Quiz');
  docid=[];

  constructor() {
    this.get.where('type', '==', 'vierAntworten').get().then((querysnapshot)=>{
      querysnapshot.forEach(()=>{
        this.doclength=this.doclength+1
      })
    }).then(()=>{
      for (let i = 0; i <this.doclength ; i++) {
          this.arr.push(i);
        }
        this.arr.sort(()=>{
          return Math.random() - 0.5;
        });
        for(let z=0;z<4;z++){
          this.fragenauswahl.push(this.arr[z]);
        }
    })
   }

  getfragenauswahl(){
    return this.fragenauswahl;
  }
  adddocid(docid1){
   this.docid.push(docid1);  
  }
  getdocid(){
    return this.docid
  }
  deletedocid(){
    this.docid=[];
  }
}
