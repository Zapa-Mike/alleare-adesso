import { LocationStrategy } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck, OnInit {
  public showNavbar = true;
  public showheader = true;
  collections = [
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
  benutzercollections = ['Fragenkatalog', 'Quiz', 'Versicherungen'];
  title = 'Alleare';
  
  constructor(private route: LocationStrategy) {
    
  }

  ngOnInit() {
    if (localStorage.getItem('hans') == null) {
      var genzahl = Math.floor(Math.random() * 1000000000 + 1).toString();
      localStorage.setItem('hans', genzahl);
    } else {
      console.log(localStorage.getItem('hans'), 'Schon gegeben');
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(function (reg) {
          console.log('Registration succeeded. Scope is ' + reg.scope);
        })
        .catch(function (error) {
          console.log('Registration failed with ' + error);
        });
    }
    //Caching
    // for(let i=0;i<this.collections.length;i++){
    //   firebase.firestore().collection(this.collections[i]).onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
    //     snapshot.docChanges().forEach(function (change) {
    //       if (change.type === 'added') {
    //       }

    //       var source = snapshot.metadata.fromCache ? 'local cache' : 'server';
    //       console.log('Data came from ' + source);
    //     });
    //   });
    // }

    //   for(let y=0;y<this.benutzercollections.length;y++){
    // firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection(this.benutzercollections[y]).onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
    //   snapshot.docChanges().forEach(function (change) {
    //     if (change.type === 'added') {
    //     }

    //     var source = snapshot.metadata.fromCache ? 'local cache' : 'server';
    //     console.log('Data came from ' + source);
    //   });
    //  });
    // }
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
