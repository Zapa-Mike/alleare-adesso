import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stories',
  template: `
  
  
    <div class="Frage">
        <div class="card">
          <div>
            <div class="form-check form-check-inline">
              <img src="{{imgArray[i]}}" class="img-responsive" >
            </div>
            <div class="ImageStory">
            {{ storyanzeige}}
        </div>
            <input type="radio" id="auto1" name="auto" />
            <label class="form-check-label"> ja </label>
            <input type="radio" id="auto2" name="auto" />
            <label class="form-check-label"> nein </label>
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
        
    </div>
    
    `,
    styleUrls: ['./questions.component.css']
  })
  export class StoriesComponent implements DoCheck {
  
  @Input() Fragenliste;
  @Input() Storyliste;
  i:number=0;
  test2:string;
  imgArray= [];
  fragen:string[]=[]; 
  fragenanzeige: string;
  story:string[]=[]; 
  storyanzeige: string;
  
  
   
  constructor() { 
   this.imgArray= [];
  

    this.imgArray[0]="/assets/fragenkatalog/story_shopping.png";
  
    this.imgArray[1] ="/assets/fragenkatalog/story_bahnhof.png";

    this.imgArray[2] ="/assets/fragenkatalog/rechtliche_Hilfe.png";
  
    this.imgArray[3] ="/assets/fragenkatalog/wunsch.png";

    this.imgArray[4] ="/assets/fragenkatalog/immobilien_sparen.png";

    this.imgArray[5] ="/assets/fragenkatalog/reisen.png";
   


  
   
  }
   
  
    ngDoCheck(): void {
      this.fragen = this.Fragenliste;
      this.story = this.Storyliste;
      this.storyanzeige=this.story[this.i]
      
    }
  
  
   
    push(){
      if(this.fragen.length>this.i){
      this.fragenanzeige=this.fragen[this.i]
      }
  
  
      if(this.story.length>this.i){
        this.storyanzeige=this.story[this.i]
        }
  
        this.i=this.i+1;
       
  
    }
  
  
    zurueck(){
      if(this.fragen.length>this.i){
        this.fragenanzeige=this.fragen[this.i-2]
        this.i=this.i-1;
        }
  
    }
  
  }
  
  
