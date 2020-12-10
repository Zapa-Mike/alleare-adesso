import { LocationStrategy } from '@angular/common';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { stringify } from 'querystring';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements DoCheck, OnInit {
  form: FormGroup;
  public Name: string;
  homeintro = true;
  //Routing
  logo: boolean = true;
  namenseingabe: boolean = false;
  novaIntro: boolean = false;
  novadialog: boolean = false;
  indexnovadialog: number;
  insurance: boolean = false;
  docRef = firebase
  .firestore()
  .collection('Benutzer')
  .doc(localStorage.getItem('hans'));

  constructor(private router:Router, private dataservice: DataService) {
    this.form = new FormGroup({
      Name: new FormControl(),
    });

    this.dataservice.getIndexdialog();
    this.dataservice.currentIndex2.subscribe(
      (currentIndex2) => (this.indexnovadialog = currentIndex2)
    );

    this.novadialog= false;
    this.insurance= false;
    this.namenseingabe=false;
    this.novaIntro=false;
  }
  ngOnInit() {
    
      setTimeout(() => {
        this.docRef.get().then((doc) => {
          this.homeintro  = doc.data().homeintro;
          if(this.homeintro!=false){
            this.docRef.update({homeintro:true})
            this.homeintro=true
          }})

        this.logo = false;
        if(this.homeintro==true){
          this.namenseingabe = true;
  
        }else if (this.homeintro==false){
  this.router.navigate(['/home'])
        }
        
      }, 2888);
  }

  ngDoCheck() {
    if (this.indexnovadialog == 1 && this.homeintro == true) {
      this.insurance = false;
      this.novadialog = true;
    }
  }

  saveName() {
    this.Name = this.form.value.Name;
    firebase
      .firestore()
      .collection('Benutzer')
      .doc(localStorage.getItem('hans'))
      .set({
        Name: this.Name,
        homeintro: true,
      });
    this.namenseingabe = false;
    this.novaIntro = true;
  }
  //Routing
  weiter() {
    this.novaIntro = false;
    this.insurance = true;
  }
}
