import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';

@Component({
  selector: 'tipps-article',
  template: `
<!--Überschrift-->
<body>
  <div class="title text-center">
    <h3>Geldanlage in der Corona Zeit</h3>

    <!--Zurück Pfeil-->
  <img class="backArrow" (click) = "back()"
        src="/assets/icons/icon_back_arrow.svg"/>
  </div>


   `,
  styleUrls: ['./tipps.component.css'],
})
export class articleComponent implements OnInit{
  index: number;
  constructor(private dataservice : DataService){

  }

  ngOnInit(){

  }

  back(){
    this.index = -2;
    this.dataservice.sendIndexcategory(this.index);
  }

}