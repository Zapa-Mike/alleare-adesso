import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';

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
  dbpush = firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten');
  form:FormGroup;
  
  
  constructor() {

    this.form= new FormGroup({
      Haupttaetigkeit:new FormControl(),
      tiercheckbox:new FormControl()
    });

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
// Tierfrage 
    $(document).ready(function(){
      $("#pferd").click(function(){
          $("#tierandere").prop("checked",false);
          $("#tierkeins").prop("checked",false); 
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage16: "Pferd"
          })   
      });

      $("#hund").click(function(){
        $("#tierandere").prop("checked",false);
        $("#tierkeins").prop("checked",false);  
        firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage16: "Hund"
        })
    });
    $("#tierandere").click(function(){
      $("#tierkeins").prop("checked",false);     
      firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
        Frage16: "Andere"
      })
  });
  $("#tierkeins").click(function(){
    $("#tierandere").prop("checked",false); 
    firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
      Frage16: "Keine"
    })
});



      $("#Wbutton").click(function(){
          $("#redundant1").prop("checked", false);
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
          console.log("Data came from " + source);
        });
      });
    firebase
      .firestore()
      .collection('_Fragenkatalog')
      .onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {

          }

          var source = snapshot.metadata.fromCache ? 'local cache' : 'server';
          console.log("Data came from " + source);
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
            if (i == 3 || i == 5 || i==8 || i==9 || i==10 || i==11)
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
    var el = document.getElementById("Wohnung");
    el.addEventListener("click",()=> this.datapush("Wohnung"), false);
    var el1 = document.getElementById("Haus");
    el1.addEventListener("click",()=> this.datapush("Haus"), false);

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
  datapush(wohnung?:any,tier?:any){
    if(this.form.value.Haupttaetigkeit!=null){
    this.dbpush.update({
      Frage14:this.form.value.Haupttaetigkeit
    })
    }
    if(wohnung=="Haus"){ //
      this.dbpush.update({
        Frage15:'Haus'
      })
    }else if(wohnung=="Wohnung"){
      this.dbpush.update({
        Frage15:'Wohnung'
      })
    }
//Frage 16 wird über jquery abgefragt


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
