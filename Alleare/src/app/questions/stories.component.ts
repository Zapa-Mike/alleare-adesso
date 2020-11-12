import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';

@Component({
  selector: 'app-stories',
  template: `
    <div class="Frage">
        <div [formGroup]="form" class="card">
          <div>
            <div class="form-check form-check-inline">
              <img src="{{imgArray[i]}}" class="img-responsive" >
            </div>
            <div class="ImageStory">
            {{ storyanzeige}}
          </div>
           <!--"Anhören" Button-->
           <div class="AnhoerenButton">
            <button class="btn" id="anhoeren">
              <img class="anhoerenIcon" src="/assets/icons/icon_anhoeren.svg" />
              Anhören
            </button>
          </div>

            <input type="radio" name="stories" formControlName="stories" value="ja" id="redundant"/>
            <label class="form-check-label"> ja </label>
            <input type="radio" name="stories" formControlName="stories" value="nein" id="redundant1"/>
            <label class="form-check-label"> nein </label>
          </div>
        </div>
      </div>
      <div class="col rowVZ">
        <button id="Wbutton" class="btn" (click)="push()"> <!--Andere id als bei radio.component-->
          <img
            src="/assets/icons/icon_arrow_forward.svg"
            width="50"
            height="50"
          />
        </button>
        <button id="bbutton" class="btn" (click)="zurueck()" *ngIf="zurueckButton">
          <img src="/assets/icons/icon_arrow_back.svg" width="50" height="50" />
        </button>
      </div>

      <div class="ImageStory"><!--Story "Frage"--></div>
      <div class="d-flex Nova justify-content-end">
        <img
          src="/assets/nova/nova_intro_rechts.png"
          width="100"
          height="100"
          id="NovaImage"
        />
      </div>
  
      
  `,
  styleUrls: ['./questions.component.css'],
})
export class StoriesComponent implements DoCheck {
  @Input() Fragenliste;
  @Input() Storyliste;
  i:number=0;
  form:FormGroup;
  test2:string;
  imgArray= [];
  fragen:string[]=[]; 
  fragenanzeige: string;
  story: string[] = [];
  storyanzeige: string;
  dbpush=firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten');
  zurueckButton=false;
  
  constructor() { 
   this.imgArray= [];
    this.imgArray[0]="/assets/fragenkatalog/story_shopping.png";

    this.imgArray[1] = '/assets/fragenkatalog/story_bahnhof.png';

    this.imgArray[2] = '/assets/fragenkatalog/rechtliche_Hilfe.png';

    this.imgArray[3] = '/assets/fragenkatalog/wunsch.png';

    this.imgArray[4] = '/assets/fragenkatalog/immobilien_sparen.png';

    this.imgArray[5] ="/assets/fragenkatalog/reisen.png";
  
    this.form=new FormGroup({
      stories:new FormControl()
    }) 
  }

  ngDoCheck(): void {
    this.fragen = this.Fragenliste;
    this.story = this.Storyliste;
    this.storyanzeige = this.story[this.i];
  }

  push() {
    

    const radio1 =  document.getElementById("redundant") as HTMLInputElement;
    const radio2 =  document.getElementById("redundant1") as HTMLInputElement;

    if(radio1.checked || radio2.checked) {
   
      if(this.fragen.length>this.i){
      this.fragenanzeige=this.fragen[this.i]
      if (this.i <=0) {
        this.zurueckButton = true;
      }
      }
  
  
      if(this.story.length>this.i){
        this.storyanzeige=this.story[this.i]
      }
        switch(this.i){
          case 0:
            this.dbpush.update({
            Frage1:this.form.value.stories
            })
            break;
          case 1:
            this.dbpush.update({
              Frage2:this.form.value.stories
            })
            break;
            case 2:
            this.dbpush.update({
              Frage3:this.form.value.stories
            })
            break;
            case 3:
            this.dbpush.update({
              Frage4:this.form.value.stories
            })
            break;
            case 4:
            this.dbpush.update({
              Frage5:this.form.value.stories
            })
            break;
            case 5:
            this.dbpush.update({
              Frage6:this.form.value.stories
            })
            break;
        }

    this.i = this.i + 1;
  }
}

  zurueck() {
    if (this.i <= 1) {
      this.zurueckButton = false;
    }
    if (this.fragen.length > this.i) {
      this.fragenanzeige = this.fragen[this.i - 2];
      this.i = this.i - 1;
    }
  }
}
//Radio-Button disabled Auswahl bei weiter Button
  $(document).ready(function(){
    $("#Wbutton").click(function(){
        $("#redundant").prop("checked",false);
    });
    $("#Wbutton").click(function(){
        $("#redundant1").prop("checked", false);
    });
});