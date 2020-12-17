import { LocationStrategy } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck, OnInit {
  public showNavbar = true;
  public showheader = true;
  public collections = [
    'Bundeslaender',
    'FAQ',
    'Finanzen',
    'Flashcards',
    'Fragenkatalog',
    'Gesundheit',
    'Quiz',
    'Reisen',
    'Selbstständigkeit',
    'Sport',
    'Versicherungen',
    'Wirtschaft',
  ];
  public userCollections = ['Fragenkatalog', 'Quiz', 'Versicherungen'];
  public title = 'Alleare';

  constructor(private route: LocationStrategy) {}

  ngOnInit() {
    //'hans' = BenutzerID
    if (localStorage.getItem('hans') == null) {
      // Setzt eine zufällige Zahl als Benutzerzahl
      var userID = Math.floor(Math.random() * 1000000000 + 1).toString();
      localStorage.setItem('hans', userID); // Zufallszahl wird als BenuterID in der DB hinterlegt
    } else {
      console.log('BenutzerID: ' + localStorage.getItem('hans'));
    }

    //Caching
    for (let i = 0; i < this.collections.length; i++) {
      firebase
        .firestore()
        .collection(this.collections[i])
        .onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
          snapshot.docChanges().forEach(function (change) {
            if (change.type === 'added') {
            }

            var source = snapshot.metadata.fromCache ? 'local cache' : 'server';
            console.log('Data came from ' + source);
          });
        });
    }

    for (let y = 0; y < this.userCollections.length; y++) {
      firebase
        .firestore()
        .collection('Benutzer')
        .doc(localStorage.getItem('hans'))
        .collection(this.userCollections[y])
        .onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
          snapshot.docChanges().forEach(function (change) {
            if (change.type === 'added') {
            }

            var source = snapshot.metadata.fromCache ? 'local cache' : 'server';
            console.log('Data came from ' + source);
          });
        });
    }
  }

  ngDoCheck() {
    // Blendet NavBar und Header passend in der gesamten App ein uns aus
    const route = this.route.path();
    if (route.startsWith('/home')) {
      this.showNavbar = false;
      this.showheader = true;
    } else if (route.startsWith('/evaluation')) {
      this.showNavbar = false;
      this.showheader = true;
    } else if (route.startsWith('/intro')) {
      this.showNavbar = false;
      this.showheader = false;
    } else if (route.startsWith('/questions')) {
      this.showNavbar = false;
    } else {
      this.showNavbar = true;
      this.showheader = true;
    }
  }
}
