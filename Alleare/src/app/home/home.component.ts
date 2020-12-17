import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  nameIntro: string;
  NameIntro: string;
  index = 0;
  google1=false;
  home=true;

   docRef = firebase
  .firestore()
  .collection('Benutzer')
  .doc(localStorage.getItem('hans'));

  headerGrau = false;
  homeintro = false;
  constructor(private dataservice: DataService, private router: Router) {
   
  }

  ngOnInit() {
    this.dataservice.deleteindex();//Löscht Index des Fragenkatalogs
    this.docRef.get().then((doc) => {
      if (doc.exists) {
        this.nameIntro = doc.data().Name;
        this.homeintro  = doc.data().homeintro;
        if(this.homeintro==false){
          this.home= true;
        }
        
      }
    });
  
    
  }
  fragebogen() {
  
    if(this.homeintro==false){
      var index = (0).toString();
      localStorage.setItem('storyIndex', index);
      localStorage.setItem('radioIndex', index);
      this.router.navigate(['/questions'])
    }
    

  }
  weitermachen() {
    this.docRef.update({homeintro:false})
    this.home= true;
    this.homeintro = false;
    this.dataservice.sendHeader(false);
  }

  navigate() {
    this.router.navigate(['/nova'], {
      queryParams: { name: this.nameIntro },
    });
  }
  google(){
    this.home=false;
    this.google1=true;
  }
}
