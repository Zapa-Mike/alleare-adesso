import { Component, OnInit,} from '@angular/core';
import { Data, Router } from '@angular/router';
import firebase from 'firebase';
import { IntroComponent } from '../intro/intro.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  nameIntro: string;

  NameIntro:string;
  index=0;


  constructor(private dataservice:DataService, private router : Router) {
  }

  ngOnInit(){
    this.dataservice.addIndexTemp1(this.index);// Damit wir aus dem Fragenkatalog raus und rein können
    var docRef = firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans'));

    docRef.get().then((doc) => {
      if (doc.exists) {
        this.nameIntro = doc.data().Name;
      }
    });
  }
  fragebogen() {
    var index = (0).toString();
    localStorage.setItem('storyIndex', index);
    localStorage.setItem('radioIndex', index);
  }

  navigate() {
    this.router.navigate(['/nova'], {
      queryParams: { name: this.nameIntro },
    });
  }
}
