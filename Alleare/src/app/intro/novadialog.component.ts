import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-novadialog',
  template: `
<div class="container">
  <div class="bubble shadow bubble-bottom-right" contenteditable="false">
    Das war ein Teil von vielen Irrtümer und Alltagssituationen
  </div>   
    <div class="col2">
        <img src="/assets/nova/nova_intro_rechts.png"
            width="100"
            height="100"
            id="NovaImage"/>
    </div>     
  
  <div class="col justify-content-center">
      <button type="submit" class="btn rounded-pill" routerLink="/home">
        WEITER
      </button>
  </div>
</div>
  `,
  styleUrls: ['./intro.component.css'],
})
export class novadialogComponent implements OnInit{

  constructor(private dataservice : DataService){

  }

  ngOnInit(){

  }

}

