import { Component, OnInit, Input, Output } from '@angular/core';
import firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  Fragenliste: string[] = []; //Anderen Fragen
  Storyliste: string[] = []; //Alle Stories für Radio Buttons
  StorybezogeneFragenliste: string[] = []; //Fragen zu den Stories
  RadiobuttonFragen: string[] = []; //Radio Fragen ohne Story

  constructor() {
    var db = firebase.firestore();
    var questions: string[] = [];
    var stories: string[] = [];

    //Bundesland-ListenAbfrage
    $(document).ready(function () {
      $('#drop a').on('click', function () {
        var txt = $(this).text();
        firebase
          .firestore()
          .collection('Benutzer')
          .doc(localStorage.getItem('hans'))
          .collection('Fragenkatalog')
          .doc('Antworten')
          .update({
            Frage13: txt,
          });
      });
    });

    firebase
      .firestore()
      .collection('Fragenkatalog')
      .onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
          }

          var source = snapshot.metadata.fromCache ? 'local cache' : 'server';
        });
      });
    firebase
      .firestore()
      .collection('_Fragenkatalog')
      .onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            console.log('Name: ', change.doc.data());
          }

          var source = snapshot.metadata.fromCache ? 'local cache' : 'server';
          console.log('Data came from ' + source);
        });
      });

    //Fragen, welche nicht die Stories betreffen, von der Datenbank abgreifen und umwandeln in ein String
    for (let i = 1; i <= 7; i++) {
      db.collection('Fragenkatalog')
        .doc('Frage' + i.toString().padStart(2, '0'))
        .withConverter(questionConverter)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            questions.push(doc.data().Question);
            tmpFragen.push(questions[i - 1]);
            if (i == 3 || i == 5) tmpRadioFragen.push(doc.data().Question);
          } else {
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    }
    //Storybezogene Fragen von der Datenbank abgreifen und umwandeln in ein String
    for (let i = 1; i <= 6; i++) {
      db.collection('_Fragenkatalog')
        .doc('Frage' + i.toString().padStart(2, '0'))
        .withConverter(questionConverter)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            tmpStorybezogeneFragen.push(doc.data().Question);
          } else {
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    }

    //Stories von der Datenbank abgreifen und umwandeln in ein String
    for (let i = 1; i <= 6; i++) {
      db.collection('_Fragenkatalog')
        .doc('Story' + i.toString().padStart(2, '0'))
        .withConverter(storyConverter)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            stories.push(doc.data().Story);
            tmpStories.push(stories[i - 1]);
          } else {
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    }
    this.Fragenliste = tmpFragen;
    this.Storyliste = tmpStories;
    this.StorybezogeneFragenliste = tmpStorybezogeneFragen;
    this.RadiobuttonFragen = tmpRadioFragen;
  }

  ngOnInit() {
    var docRef = firebase
      .firestore()
      .collection('Benutzer')
      .doc(localStorage.getItem('hans'))
      .collection('Fragenkatalog')
      .doc('Antworten');
    docRef.get().then((doc) => {
      if (doc.exists) {
      } else {
        // doc.data() will be undefined in this case
        firebase
          .firestore()
          .collection('Benutzer')
          .doc(localStorage.getItem('hans'))
          .collection('Fragenkatalog')
          .doc('Antworten')
          .set({
            Initialisierung: true,
          });
      }
    });
  }
}

let tmpFragen: string[] = [];
let tmpRadioFragen: string[] = [];
let tmpStorybezogeneFragen: string[] = [];
let tmpStories: string[] = [];

export class Questions {
  Question: string;

  constructor(question) {
    this.Question = question;
  }
}

// Firestore data converter
var questionConverter = {
  toFirestore: function (questions) {
    return {
      _: questions.name,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Questions(data._);
  },
};

export class Stories {
  Story: string;

  constructor(story) {
    this.Story = story;
  }
}

// Firestore data converter
var storyConverter = {
  toFirestore: function (story) {
    return {
      _: story.name,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Stories(data._);
  },
};
