import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit{
  panelOpenState = false;
  faq=[];
  constructor(){}
  ngOnInit(){
    firebase.firestore().collection('FAQ').get().then((querysnapshot)=>{
      querysnapshot.forEach((doc)=>{
        this.faq.push(
          {
            fragen:doc.id,
            antworten:doc.data().antwort
          }
        )
      })
    })
  }
}