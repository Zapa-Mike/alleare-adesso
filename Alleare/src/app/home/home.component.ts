import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  nameIntro: string;

  constructor(private router: Router) {}

  ngOnInit() {
    var docRef = firebase
      .firestore()
      .collection('Benutzer')
      .doc(localStorage.getItem('hans'));

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
