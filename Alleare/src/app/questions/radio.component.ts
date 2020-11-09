import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-radio',
  template: `
<br>
<br>
<br>

  <div class="Frage">
      <div class="card">
        <div>
          <div class="form-check form-check-inline">
            <img
              src="/assets/fragenkatalog/auto.png"
              height="50px"
              width="30px"
            />
          </div>

          <input type="radio" id="auto1" name="auto" />
          <label class="form-check-label"> ja </label>
          <input type="radio" id="auto2" name="auto" />
          <label class="form-check-label"> nein </label>
        </div>
      </div>
      <div class="col rowVZ">
        <button id="Vbutton" class="btn" (click)="zurueck()">
          <img
            src="/assets/icons/icon_arrow_forward.svg"
            width="50"
            height="50"
          />
        </button>
        <button id="Zbutton" class="btn" (click)="push()">
          <img src="/assets/icons/icon_arrow_back.svg" width="50" height="50" />
        </button>
      </div>

      <div class="ImageStory"><!--Story "Frage"-->{{Fragen}}</div>
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
export class RadioComponent implements OnInit {

@Input() Fragen;
  constructor() { 

    console.log(this.Fragen);
  }

  ngOnInit(): void {
  }


  push(){

    console.log(this.Fragen)
  }

  zurueck(){

  }

}