import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  Versicherungen=["","Haftpflichtversicherung","Hausratversicherung"];
  priorisierung=[];
  db= firebase.firestore().collection('test');
  db1=firebase.firestore();
  constructor() { }

  ngOnInit(): void {


for(let i=1;i<=3;i++){
this.db.doc('Frage' + i.toString().padStart(2, '')).get().then((doc)=>{ //Antworten des Users
    if(doc.data()._=="ja"){
        this.db1.collection('Versicherungen').doc(this.Versicherungen[i]).get().then(function(doc){ //Versicherung id data prio
              perVersicherung.push(doc.id);
              Versicherungsprioritaet.push(doc.data().Priorisierung)
              console.log(perVersicherung);
              console.log("dada"+Versicherungsprioritaet)

          })
      }
      }

)}
}
}
let perVersicherung:any[]=[];
let Versicherungsliste:string[]=[];
let Versicherungsprioritaet:any[]=[];







/* vers[2]=pro[2]
 pro[2]=8
 pro[2]=[8]
 tmp
 vers[2]=[8]

 1 2 3 4*/