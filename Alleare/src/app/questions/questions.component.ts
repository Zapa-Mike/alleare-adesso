import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase, { firestore } from 'firebase';
import { DataService } from '.././services/data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit, DoCheck {
  Fragenliste: string[] = []; //Anderen Fragen
  Storyliste: string[] = []; //Alle Stories für Radio Buttons
  StorybezogeneFragenliste: string[] = []; //Fragen zu den Stories
  RadiobuttonFragen: string[] = []; //Radio Fragen ohne Story
  dbpush = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Fragenkatalog')
    .doc('Frage12');
  form: FormGroup;
  indexradiovisible: boolean = false;
  indexstoryvisible: boolean = true;

  indexradio: number;
  indexstory: number;

  Frage1:boolean=false;
  Frage2:boolean=false;
  Frage3:boolean=false;
  Frage4:boolean=false;
  Frage5:boolean=false;
  routing:number=1;
  dbImage = firebase
  .firestore()
  .collection('Images_Fragen');
  db1Image = firebase.firestore();
  imgArray = [];
  
  constructor(private dataservice:DataService) {
    this.form= new FormGroup({ //Muss raus alles mit jquery
      Haupttaetigkeit:new FormControl()
    });

    this.dataservice.getIndexradio();
    this.dataservice.currentIndex.subscribe(
      (currentIndex) => (this.indexradio = currentIndex)
    );
    this.dataservice.getIndexstory();
    this.dataservice.currentIndex1.subscribe(
      (currentIndex1) => (this.indexstory = currentIndex1)
    );

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
    //Fragen, welche nicht die Stories betreffen, von der Datenbank abgreifen und umwandeln in ein String
    for (let i = 1; i <= 11; i++) {
      db.collection('Fragenkatalog')
        .doc('Frage' + i.toString().padStart(2, '0'))
        .withConverter(questionConverter)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            questions.push(doc.data().Question);
            tmpFragen.push(questions[i - 1]);
            if (i == 3 || i == 5 || i == 8 || i == 9 || i == 10 || i == 11)
              tmpRadioFragen.push(doc.data().Question);
          } else {
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    }
    //Storybezogene Fragen von der Datenbank abgreifen und umwandeln in ein String
    for (let i = 1; i <= 5; i++) {
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
    for (let i = 1; i <= 5; i++) {
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
      .doc('Initialisierung');
    docRef.get().then((doc) => {
      if (doc.exists) {
        //Nothing
      } else {
        firebase
          .firestore()
          .collection('Benutzer')
          .doc(localStorage.getItem('hans'))
          .collection('Fragenkatalog')
          .doc('Initialisierung')
          .set({
            Initialisierung: true,
          });
      }
    });

    for (let i = 1; i <= 6; i++) {
      if(i==0) {
      } else {
        this.dbImage
          .doc('Antwort' + i.toString().padStart(2, ''))
          .get()
          .then((doc) => {
            //Antworten des User
            this.imgArray.push(doc.data()._); 
      });
    }
  }
  }

  ngDoCheck(){
    if(this.indexradio==-1){
      this.indexradiovisible=false;
      this.indexstoryvisible=true;
      this.indexradio=+1;
    }

    if(this.indexstory==5){
      this.indexstoryvisible=false;
      this.indexradiovisible=true;
      this.indexstory=+1;
    }
    if (this.indexradio == 6) {
      this.indexradiovisible = false;
      this.Frage1 = true;
      this.indexradio = +1;
    }
  }
  async wohnort() {
    $(document).ready(function () {
      $('#Wohnung').click(function () {
        firebase
          .firestore()
          .collection('Benutzer')
          .doc(localStorage.getItem('hans'))
          .collection('Fragenkatalog')
          .doc('Frage13')
          .set({
            _: 'Wohnung',
          });
      });
      $('#Haus').click(function () {
        console.log('Haus ausgewählt');
        firebase
          .firestore()
          .collection('Benutzer')
          .doc(localStorage.getItem('hans'))
          .collection('Fragenkatalog')
          .doc('Frage13')
          .set({
            _: 'Haus',
          });
      });
    });
  }
  async eigentum() {
    $(document).ready(function () {
      $('#redundant4').click(function () {
        firebase
          .firestore()
          .collection('Benutzer')
          .doc(localStorage.getItem('hans'))
          .collection('Fragenkatalog')
          .doc('Frage14')
          .set({
            _: 'Miete',
          });
      });
      $('#redundant5').click(function () {
        console.log('Haus ausgewählt');
        firebase
          .firestore()
          .collection('Benutzer')
          .doc(localStorage.getItem('hans'))
          .collection('Fragenkatalog')
          .doc('Frage14')
          .set({
            _: 'Eigentum',
          });
      });
    });
  }

  async tiere() {
    $(document).ready(function () {
      $('#pferd').click(function () {
        $('#tierandere').prop('checked', false);
        $('#tierkeins').prop('checked', false);
        firebase
          .firestore()
          .collection('Benutzer')
          .doc(localStorage.getItem('hans'))
          .collection('Fragenkatalog')
          .doc('Frage15')
          .set({
            _: 'Pferd',
          });
      });

      $('#hund').click(function () {
        $('#tierandere').prop('checked', false);
        $('#tierkeins').prop('checked', false);
        firebase
          .firestore()
          .collection('Benutzer')
          .doc(localStorage.getItem('hans'))
          .collection('Fragenkatalog')
          .doc('Frage15')
          .set({
            _: 'Hund',
          });
      });
      $('#tierandere').click(function () {
        $('#tierkeins').prop('checked', false);
        firebase
          .firestore()
          .collection('Benutzer')
          .doc(localStorage.getItem('hans'))
          .collection('Fragenkatalog')
          .doc('Frage15')
          .set({
            _: 'Andere',
          });
      });
      $('#tierkeins').click(function () {
        $('#tierandere').prop('checked', false);
        firebase
          .firestore()
          .collection('Benutzer')
          .doc(localStorage.getItem('hans'))
          .collection('Fragenkatalog')
          .doc('Frage15')
          .set({
            _: 'Keine',
          });
      });
      $('#Wbutton').click(function () {
        $('#redundant1').prop('checked', false);
      });
    });
  }
  async beziehung() {
    $(document).ready(function () {
      $('#Single').click(function () {
        firebase
          .firestore()
          .collection('Benutzer')
          .doc(localStorage.getItem('hans'))
          .collection('Fragenkatalog')
          .doc('Frage16')
          .set({
            _: 'Ledig',
          });
      });
      $('#Verheiratet').click(function () {
        firebase
          .firestore()
          .collection('Benutzer')
          .doc(localStorage.getItem('hans'))
          .collection('Fragenkatalog')
          .doc('Frage16')
          .set({
            _: 'Verheiratet',
          });
      });
    });
  }

  async datapush() {
    console.log(this.routing);
    if (this.form.value.Haupttaetigkeit != null) {
      this.dbpush.set({
        _: this.form.value.Haupttaetigkeit,
      });
    }
    switch (this.routing) {
      case 1:
        this.Frage1 = false;
        this.Frage2 = true;
        if (this.Frage2 == true) {
          this.wohnort();
          this.eigentum();
        }
        break;
      case 2:
        this.Frage2 = false;
        this.Frage3 = true;
        if (this.Frage3 == true) {
          this.tiere();
        }
        break;
      case 3:
        this.Frage3 = false;
        this.Frage4 = true;
        if (this.Frage4 == true) {
          this.beziehung();
        }
        break;
      case 4:
        this.Frage4 = false;
        this.Frage5 = true;
        if (this.Frage5 == true) {
          $(document).ready(function () {
            $('#drop a').on('click', function () {
              var txt = $(this).text();
              firebase
                .firestore()
                .collection('Benutzer')
                .doc(localStorage.getItem('hans'))
                .collection('Fragenkatalog')
                .doc('Frage17')
                .set({
                  _: txt,
                });
            });
          });
        }
        break;
    }
    this.routing = this.routing + 1;
  }

  zurueck(){
    this.routing=this.routing-1;

    switch(this.routing){
    case 0:
            this.indexradiovisible=true; 
            this.Frage1 = false; 
            this.routing = 1; 
    break;
    case 1: this.routing=0;
    this.Frage1=true; this.Frage2=false; 
    break;
    case 2: this.Frage2=true; this.Frage3=false;
    this.wohnort();
    break;
    case 3: this.Frage3=true; this.Frage4=false;
    this.tiere();
    break;
    case 4: this.Frage4=true; this.Frage5=false;
    this.beziehung();
    break;
   

  }
  

  }
  weiter(){}
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


