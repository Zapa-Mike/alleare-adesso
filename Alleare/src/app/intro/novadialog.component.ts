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
  <img class="Nova_Intro_Irrtuemer_Alltagssituationen" src="/assets/nova/nova_intro_rechts.png"/>    
  <p>Das war ein Teil von vielen Irrtümer und Alltagssituationen</p>  
</div>










  `,
  styleUrls: ['./intro.component.css'],
})
export class novadialogComponent {
  
}

