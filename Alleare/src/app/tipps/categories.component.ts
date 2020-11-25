import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';

@Component({
  selector: 'tipps-categories',
  template: `
<!--Überschrift-->
<body>
  <div class="title text-center">
    <h3>Tipps</h3>
  </div>
<!--Kategorien tags-->
    <div class="categories">
      <button id="gesundheit" class="topic1">Gesundheit</button>
      <button id="sport" class="topic">Sport</button>
      <button id="reisen" class="topic">Reisen</button>
      <button id="finanzen" class="topic">Finanzen</button>
      <button id="wirtschaft" class="topic">Wirtschaft</button>
      <button id="selbstständig" class="topic2">Selbstständigkeit</button>
    </div>
  
<!--Themenbereiche-->
    <div class="box" (click)="next()"><p>Sparen</p></div>
    <div class="box"><p>Investieren</p></div>
    <div class="box"><p>Finanzplanung</p></div>

<!--Nova-->
    <img src="/assets/nova/nova_flashcard_singing.png"
         width="100"
         height="100"
         routerLink="/nova"
         id="NovaImage"/> 

      

</body>
   `,
  styleUrls: ['./tipps.component.css'],
})
export class categoriesComponent implements OnInit{
  index: number = 0;

    constructor(private dataservice : DataService){

  }

  ngOnInit(){

  }

  next(){
    this.index= 1;
    this.dataservice.sendIndexcategory(this.index);
  }
}
