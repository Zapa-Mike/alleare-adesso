import { LocationStrategy } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck, OnInit {
  public showNavbar = true;
  public showheader = true;
  collections=["Fragenkatalog","_Fragenkatalog","Images_Story","Images_Fragen","Images_Radio","Flashcards"];
  title = 'Alleare';

  constructor(private route: LocationStrategy) {
    for(let i=0;i<this.collections.length;i++){
    firebase.firestore().collection(this.collections[i]).onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === 'added') {
        }

        var source = snapshot.metadata.fromCache ? 'local cache' : 'server';
        console.log('Data came from ' + source);
      });
    });
  }
  }

  ngOnInit() {
    if (localStorage.getItem('hans') == null) {
      var genzahl = Math.floor(Math.random() * 1000000000 + 1).toString();
      localStorage.setItem('hans', genzahl);
    } else {
      console.log(localStorage.getItem('hans'), 'Schon gegeben');
    }
    
  }

  ngDoCheck() {
    // Controls Navbar and Header on all screens
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
