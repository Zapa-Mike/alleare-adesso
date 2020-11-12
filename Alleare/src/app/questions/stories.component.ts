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
            <input type="radio" name="stories"  id="auto1" formControlName="stories" value="ja"/>
            <label class="form-check-label"> ja </label>
            <input type="radio" name="stories" id="auto2" formControlName="stories" value="nein"/>
            <label class="form-check-label"> nein </label>
          </div>
        </div>
      </div>
      <div class="col rowVZ">
        <button id="Vbutton" class="btn" (click)="push()">
          <img
            src="/assets/icons/icon_arrow_forward.svg"
            width="50"
            height="50"
          />
        </button>
        <button id="Zbutton" class="btn" (click)="zurueck()">
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
    const radio1 =  document.getElementById("auto1") as HTMLInputElement;
    const radio2 =  document.getElementById("auto2") as HTMLInputElement;

    if(radio1.checked || radio2.checked) {
   
      if(this.fragen.length>this.i){
      this.fragenanzeige=this.fragen[this.i]
      }
  
  
      if(this.story.length>this.i){
        this.storyanzeige=this.story[this.i]
      }
        switch(this.i){
          case 0:
            this.dbpush.update({
            Frage3:this.form.value.stories
            })
            break;
          case 1:
            this.dbpush.update({
              Frage4:this.form.value.stories
            })
            break;
            case 2:
            this.dbpush.update({
              Frage5:this.form.value.stories
            })
            break;
            case 3:
            this.dbpush.update({
              Frage6:this.form.value.stories
            })
            break;
            case 4:
            this.dbpush.update({
              Frage7:this.form.value.stories
            })
            break;
            case 5:
            this.dbpush.update({
              Frage8:this.form.value.stories
            })
            break;
        }

    this.i = this.i + 1;
  }
}

  zurueck() {
    if (this.fragen.length > this.i) {
      this.fragenanzeige = this.fragen[this.i - 2];
      this.i = this.i - 1;
    }
  }
}
  $(document).ready(function(){
    $("#Vbutton").click(function(){
      $("#auto1").prop("checked",false);
        $("#auto2").prop("checked", false);
    });
});