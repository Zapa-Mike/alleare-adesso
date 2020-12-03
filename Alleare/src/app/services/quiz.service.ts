import { Injectable, OnInit } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  fragenauswahl=[];
  doclength=0;
  arr=[];
  get = firebase.firestore().collection('Quiz');
  
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
}
