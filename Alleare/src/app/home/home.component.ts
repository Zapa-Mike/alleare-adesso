import { Component, OnInit,} from '@angular/core';
import firebase from 'firebase';
import { IntroComponent } from '../intro/intro.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  NameIntro:string;


  constructor() {
  }

  ngOnInit(){
    var docRef = firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans'));

    docRef.get().then((doc) => {
      if (doc.exists) {
        this.NameIntro= doc.data().Name;

      }
  }
    )
}
fragebogen(){
  var index = (0).toString();
  localStorage.setItem('storyIndex', index);
  localStorage.setItem('radioIndex', index);
}
}
