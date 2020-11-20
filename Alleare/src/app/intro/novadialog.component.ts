import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-novadialog',
  template: `
<div class="dialog">
  <div class="novabubble shadow speech-bubble" contenteditable="false">
    <p>Das war ein Teil von vielen Irrtümer und Alltagssituationen</p>
      <div class="nova">
        <img src="/assets/nova/nova_intro_rechts.png"
            width="100"
            height="100"
            id="NovaImage1"/>
      </div>     
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

