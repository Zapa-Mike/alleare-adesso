import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-stories',
  template: `
       <div class="Frage">
      <div [formGroup]="form" class="card">
        <div>
        <img src="data:image/gif;base64,{{bildanzeige}}" class="img-responsive"/>
          <div *ngIf="storyvisible"class="ImageStory">
            {{ storyanzeige }}
          </div>
          <!--"Anhören" Button-->
          <div class="AnhoerenButton">
            <button *ngIf="storyvisible" class="btn" id="anhoeren">
              <img class="anhoerenIcon" src="/assets/icons/icon_anhoeren.svg" />
              Anhören
            </button>
          </div>
          <div class="RadioButtonsJaNein form-group">
            <div id="ButtonJa" class="form-check form-check-inline">
              <input
                type="radio"
                name="stories"
                formControlName="stories"
                value="ja"
                id="redundant"
              />
              <label class="form-check-label"> Ja </label>
            </div>
            <div id="ButtonNein" class="form-check form-check-inline">
              <input
                type="radio"
                name="stories"
                formControlName="stories"
                value="nein"
                id="redundant1"
              />
              <label class="form-check-label"> Nein </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col rowVZ form-group">
      <button id="Wbutton" class="btn" (click)="weiter()">
        <!--Andere id als bei radio.component-->
        <img
          src="/assets/icons/icon_arrow_forward.svg"
          width="50"
          height="50"
        />
      </button>
      <button id="bbutton" class="btn" (click)="zurueck()">
        <img src="/assets/icons/icon_arrow_back.svg" width="50" height="50" />
      </button>
    </div>
    <div class="grid-containerNovaSprechblase">
      <div class="bubble shadow bubble-bottom-right" contenteditable="false">
        {{ fragenanzeige }}
      </div>
      <img
        src="/assets/nova/nova_fragenkatalog.png"
        width="100"
        height="100"
        id="NovaImage"
      />
    </div>
  `,
  styleUrls: ['./questions.component.css'],
})
export class StoriesComponent implements OnInit, DoCheck {
  
  form: FormGroup;
  index:number=0;

  //Variablen zum speichern der Liste
  bildstory:any[]=[];
  bildradio:any[]=[];
  storyfrage:string[]=[];
  radiofrage:string[]=[];
  story:string[]=[];
  docidstory:any[]=[];
  docidradio:any[]=[];
  storyvisible:boolean=true;

  storyanzeige:string;
  fragenanzeige:string;
  bildanzeige:any;
  storiesausblenden:boolean=false;
  indexstory=[];
  jalla:boolean;

  dbpush=firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Fragenkatalog');
    dbget=firebase.firestore().collection('Fragenkatalog');


constructor(private dataservice:DataService){
      this.form = new FormGroup({
          stories: new FormControl(),
      });
      this.dbget.where("type","==","radiostory").get()
        .then((querysnapshot)=>{
            querysnapshot.forEach((doc)=>{
                this.storyfrage.push(doc.data()._);
                this.docidstory.push(doc.id);
                this.story.push(doc.data().story);
                this.bildstory.push(doc.data().bild);
            })
        })
        this.dbget.where("type","==","zweiradio").get()
        .then((querysnapshot)=>{
            querysnapshot.forEach((doc)=>{
                this.radiofrage.push(doc.data()._);
                this.docidradio.push(doc.id);
                this.bildradio.push(doc.data().bild);
            })
        })
}

ngOnInit(){
  if(this.dataservice.getIndexTemp1()==null){
    console.log("anfang")
  }
  else{
    this.index=this.dataservice.getIndexTemp1()-1;
    if(this.index<0){
      this.index=0;
    }
  
}
const weiterButton = (document.getElementById(
  'Wbutton') as unknown) as HTMLInputElement;
  weiterButton.disabled = true;  
}

ngDoCheck(){
  const weiterButton = (document.getElementById(
    'Wbutton'
  ) as unknown) as HTMLInputElement;
  if ($('input[name=stories]:checked').length > 0)  // setzt alle gecheckten Radiobuttons zurück, wenn nächste Seite aufgerufen wird 
  {
   weiterButton.disabled = false;  
  }
  if(this.index<this.storyfrage.length){
    this.storyvisible=true;
    this.fragenanzeige=this.storyfrage[this.index];
    this.storyanzeige=this.story[this.index];
    this.bildanzeige=this.bildstory[this.index];
    this.jalla=true;
  }
  if(this.index>this.storyfrage.length-1){
    this.storyvisible=false;
    this.fragenanzeige=this.radiofrage[this.index-this.storyfrage.length];
    this.bildanzeige=this.bildradio[this.index-this.storyfrage.length];
    this.jalla=false;
  }
  //Pfeil bei Frage1 wird ausgeblendet
  const zurueck1 = (document.getElementById(
    'bbutton'
  ) as unknown) as HTMLInputElement;
  if (this.index < 1) {
          zurueck1.disabled = true;
         } else if (this.index >= 1) {
           zurueck1.disabled = false;
        }
 
}

weiter(){
  const weiterButton = (document.getElementById(
    'Wbutton'
  ) as unknown) as HTMLInputElement;
  weiterButton.disabled = true;

  if ($('input[name=stories]:checked').length > 0)  // setzt alle gecheckten Radiobuttons zurück, wenn nächste Seite aufgerufen wird 
      {
               $('#redundant').prop('checked', false);
               $('#redundant1').prop('checked', false);
      }
  if(this.index<this.storyfrage.length+this.radiofrage.length){
    this.index++;
    this.dataservice.addIndexTemp1(this.index);
    }

  if (this.index >=this.storyfrage.length+this.radiofrage.length) {
    this.dataservice.sendIndexrouting1(2); //Weiter
    this.push();
           }
           else{
            this.push();
           }
  
}
push(){
  const radio1 = (document.getElementById(
    'redundant'
  ) as unknown) as HTMLInputElement;
  const radio2 = (document.getElementById(
    'redundant1'
  ) as unknown) as HTMLInputElement;

  if (radio1.checked || radio2.checked) 
    {
          if (this.radiofrage.length+this.storyfrage.length > this.index) {
             $('#redundant').prop('checked', false);
             $('#redundant1').prop('checked', false);
             if (this.index <= 0) {
             }
           }
    }
if(this.jalla==true)
{
  this.dbpush.doc(this.docidstory[this.index-1]).set({
    _: this.form.value.stories,
 });
}
if(this.jalla==false){
  this.dbpush.doc(this.docidradio[this.index-this.storyfrage.length-1]).set({
    _: this.form.value.stories,
 });
}
}
zurueck()
{
this.index=this.index-1;
const zurueck1 = (document.getElementById(
        'bbutton'
      ) as unknown) as HTMLInputElement;
      if (this.index < 1) {
        zurueck1.disabled = true;
      } else if (this.index >= 1) {
        zurueck1.disabled = false;
      }
}
}