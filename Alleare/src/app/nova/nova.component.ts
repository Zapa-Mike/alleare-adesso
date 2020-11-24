import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-nova',
  templateUrl: './nova.component.html',
  styleUrls: ['./nova.component.css'],
})
export class NovaComponent implements OnInit {
  NameIntro: any;

  constructor(private route: LocationStrategy) {}

  ngOnInit(): void {
    var docRef = firebase
      .firestore()
      .collection('Benutzer')
      .doc(localStorage.getItem('hans'));

    docRef.get().then((doc) => {
      if (doc.exists) {
        this.NameIntro = doc.data().Name;
      }
    });
    
  }
}
