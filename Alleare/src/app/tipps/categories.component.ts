import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl, NgForm, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';

@Component({
  selector: 'tipps-categories',
  template: `
<div *ngIf="categoriesngif">
  <!--Überschrift-->
  <div class="title text-center">
    <h3>Tipps</h3>
  </div>
  <!--Kategorien tags-->
 <div class="categories">
      <button (click)="auswahl($event)" id="Gesundheit" class="topic1">Gesundheit</button>
      <button (click)="auswahl($event)" id="Sport" class="topic">Sport</button>
      <button (click)="auswahl($event)" id="Reisen" class="topic">Reisen</button>
      <button (click)="auswahl($event)"  id="Finanzen" class="topic">Finanzen</button>
      <button (click)="auswahl($event)"  id="Wirtschaft" class="topic">Wirtschaft</button>
      <button (click)="auswahl($event)"  id="Selbstständig" class="topic2">Selbstständigkeit</button>
    </div>
  
  <!--Themenbereiche-->
<div *ngFor="let array of array1">
    <div id="{{array}}" class="box" (click)="weitergabe(array)"><p>{{array}}</p></div>
</div>
  <!--Nova-->
    <img src="/assets/nova/nova_flashcard_singing.png"
         width="100"
         height="100"
         routerLink="/nova"
         id="NovaImage"/>
</div>
<!--Articles-->
<div *ngIf="topicsngif">
  <div class="title text-center">
    <h3>{{collection}}</h3>
    <!--Zurück Pfeil-->
  <img class="backArrow" (click)="backtocategories()"
        src="/assets/icons/icon_back_arrow.svg"/>
  </div>
  <!--Schlagzeilen und Bilder-->
  <div class="headlines" *ngFor="let topic of topics">
    <div id="{{topic}}" (click)="article(topic)"><p>{{topic}}</p></div>
</div>
</div>
<div *ngIf="articlesngif">
<div class="title text-center">
    <h3>{{articleueberschrift}}</h3>
    <!--Zurück Pfeil-->
  <img class="backArrow" (click)="backtotopics()"
        src="/assets/icons/icon_back_arrow.svg"/>
  </div>
  <div>
    {{articletext}}
  </div>
</div>
   `,
  styleUrls: ['./tipps.component.css'],
})
export class categoriesComponent implements OnInit{
  index: number = 0;
  categories=["Gesundheit","Sport","Reisen","Finanzen","Wirtschaft","Selbstständigkeit"]
  dbget=firebase.firestore();
  array1=[];
  topics=[];
  collection:string;
  docid:string;
  articleueberschrift:string;
  articletext:string;

  //Routing
  categoriesngif:boolean=true;
  topicsngif:boolean=false;
  articlesngif:boolean=false;

    constructor(private dataservice : DataService){

  }

  ngOnInit(){

  }
  auswahl(event:any){
    switch(event.target.id){
      case 'Gesundheit':{
        this.empty();
        this.dbget.collection('Gesundheit').get().then((querysnapshot)=>{
          querysnapshot.forEach((doc)=>{
            this.array1.push(doc.id);
          })
        })
        this.collection='Gesundheit';
        break;
      }
      case 'Sport':{
        this.empty();
        this.dbget.collection('Sport').get().then((querysnapshot)=>{
          querysnapshot.forEach((doc)=>{
            this.array1.push(doc.id);
          })
        })
        this.collection='Sport';
        break;
      }
      case 'Reisen':{
        this.empty();
        this.dbget.collection('Reisen').get().then((querysnapshot)=>{
          querysnapshot.forEach((doc)=>{
            this.array1.push(doc.id);
          })
        })
        this.collection='Reisen';
        break;
      }
      case 'Finanzen':{
        this.empty();
        this.dbget.collection('Finanzen').get().then((querysnapshot)=>{
          querysnapshot.forEach((doc)=>{
            this.array1.push(doc.id);
          })
        })
        this.collection='Finanzen';
        break;
      }
      case 'Wirtschaft':{
        this.empty();
        this.dbget.collection('Wirtschaft').get().then((querysnapshot)=>{
          querysnapshot.forEach((doc)=>{
            this.array1.push(doc.id);
          })
        })
        this.collection='Wirtschaft';
        break;
      }
      case 'Selbstständig':{
        this.empty();
        this.dbget.collection('Selbstständigkeit').get().then((querysnapshot)=>{
          querysnapshot.forEach((doc)=>{
            this.array1.push(doc.id);
          })
        })
        this.collection='Selbstständigkeit';
        break;
      }
      }
      
    }
empty() {
      this.array1 = [];
      return this.array1;
  }
  weitergabe(id:any){
    this.topics=[];
    this.docid=id;
    this.dbget.collection(this.collection).doc(id).collection("article").get().then((querysnapshot)=>{
    querysnapshot.forEach((doc)=>{
      this.topics.push(doc.id);
    })
    })
    this.categoriesngif=false;
    this.topicsngif=true;
  }
  article(topic:string)
  {
    this.topicsngif=false;
    this.articlesngif=true;
    this.articleueberschrift=topic;
    //this.articletext
    this.dbget.collection(this.collection).doc(this.docid).collection("article").doc(topic).get().then((doc)=>{
      this.articletext=doc.data().article;
    })
  }

  backtocategories(){
    this.topicsngif=false;
    this.categoriesngif=true;
  }
  backtotopics(){
    this.articlesngif=false;
    this.topicsngif=true;
  }
}
