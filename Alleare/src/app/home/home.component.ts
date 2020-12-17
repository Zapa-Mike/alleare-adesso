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
  home=true;
   docRef = firebase
  .firestore()
  .collection('Benutzer')
  .doc(localStorage.getItem('hans'));

  homeintro = false;
  constructor(private dataservice: DataService, private router: Router) {
  }

  ngOnInit() {
    this.dataservice.deleteindexoption();//Löscht Index des Fragenkatalogs
    this.dataservice.deleteindexstory();
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
      this.router.navigate(['/questions'])
    }
  }
  weitermachen() {
    this.docRef.update({homeintro:false}) //HomeIntro wird nicht mehr angezeigt, wenn es von der DB abgefragt wird
    this.home= true; //Wird angezeigt
    this.homeintro = false; //Wird aus dem DOM entfernt
    this.dataservice.sendHeader(false); //Dataservice, speichert ab das Header nicht mehr grau angezeigt werden soll
  }

  navigate() { //Navigiert zu Nova und gibt den eingetragenenNamen mit
    this.router.navigate(['/nova'], {
      queryParams: { name: this.nameIntro },
    });
  }
}
