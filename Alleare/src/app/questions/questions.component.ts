import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase, { firestore } from 'firebase';
import { DataService } from '.././services/data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements DoCheck, OnInit{
  routing1:boolean=true;
  routing2:boolean=false;
  routing3:boolean=false;

  //Routing dataservice
  template:number;
  template1:number;

  template5:any;
  verweis=firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Versicherungen');
  fragenkatalog = true;
  start = false; 
  
  constructor(private dataservice:DataService) {

  }

  ngOnInit(){
  }
  weiter(){
    this.verweis.get().then((querysnapshot)=>{// Löscht Favorisierung bei erneutem Aufruf der Fragenkatalogs
      querysnapshot.forEach((doc)=>{
        doc.ref.delete();
        })
      })
    this.fragenkatalog= false;
    this.start= true; 
  }

  ngDoCheck(){
    this.template=this.dataservice.getIndexrouting1();
    this.template1=this.dataservice.getIndexrouting2();
    if(this.template==1){
      this.routing2=false;
      this.routing1=true;
    }
    if(this.template==2){
      this.routing1=false;
      this.routing2=true;
    }
    if(this.template==3 && this.routing1==false){
      this.routing2=false;
      this.routing3=true;
    }
    if(this.template1==1){
      this.routing3=false;
      this.routing2=true;
    }
  }
  
}