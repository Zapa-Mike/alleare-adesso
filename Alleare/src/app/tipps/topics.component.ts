import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';

@Component({
  selector: 'tipps-topics',
  template: `
<!--Überschrift-->
<body>
  <div class="title text-center">
    <h3>Sparen</h3>

    <!--Zurück Pfeil-->
  <img class="backArrow" (click) = "back()"
        src="/assets/icons/icon_back_arrow.svg"/>
  </div>

<!--Schlagzeilen und Bilder-->
  <div class="headlines" (click) ="next()">  
    <h5>Geldanlage in der Coronazeit</h5>
    <h6>Lesedauer: 5 Minuten</h6>
    <img class="image"
        src="assets/tipps/geldanlage.jpg"/>
  </div>

  <div class="headlines">
    <h5>Ist Bitcoin eine zeitgemäße Anlage?</h5>
    <h6>Lesedauer: 6 Minuten</h6>
  </div>

  <div class="headlines">
    <h5>Wenn Geldanlagen so einfach wären</h5>
    <h6>Lesedauer: 7 Minuten</h6>
  </div>

  <div class="headlines">
    <h5>Wie dein Alltag ein Geldfresser werden kann</h5>
    <h6>Lesedauer: 5 Minuten</h6>
  </div>   
   `,
  styleUrls: ['./tipps.component.css'],
})
export class topicsComponent implements OnInit{
  index: number;
  constructor(private dataservice : DataService){

  }

  ngOnInit(){

  }

  next(){
    this.index= 2;
    this.dataservice.sendIndexcategory(this.index);
  }

  back(){
    this.index = -1;
    this.dataservice.sendIndexcategory(this.index);
  }
}