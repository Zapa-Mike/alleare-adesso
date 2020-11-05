import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit {
  Fragenliste: string[]=[];
  Storyliste: string[]=[];
  BildWohnung: boolean = false;
  BildHaus: boolean = false;
  Frage7pferd:boolean=false;
  Frage7hund:boolean=false;
  Frage7andere:boolean=false;
  Frage7keins:boolean=false;
  Frage12single:boolean=false;
  Frage12paar:boolean=false;
  
  constructor() {

    var db = firebase.firestore();
    var questions: string[] =[];
    var stories : string[]= [];

    firebase.firestore().collection("Fragenkatalog")
      .onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            console.log("Name: ", change.doc.data());
          }

          var source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
        });
      });

    //Fragen von der Datenbank abgreifen und umwandeln in ein String
    for (let i = 1; i <= 13; i++) {
      db.collection("Fragenkatalog_").doc("Frage" + i.toString().padStart(2, '0'))
        .withConverter(questionConverter)
        .get().then(function (doc) {
          if (doc.exists) {
            questions.push(doc.data().Question);
            tmpFragen.push(questions[i-1]);
          } else {
            console.log("No such document!")
          }
        }
        ).catch(function (error) {
          console.log("Error getting document:", error)
        });
    }
    //Stories von der Datenbank abgreifen und umwandeln in ein String
    for (let i = 1; i <= 6; i++) {
      db.collection("Fragenkatalog_").doc("Story" + i.toString().padStart(2, '0'))
        .withConverter(storyConverter)
        .get().then(function (doc) {
          if (doc.exists) {
            stories.push(doc.data().Story);
            tmpStories.push(stories[i-1]);
          } else {
            console.log("No such document!")
          }
        }
        ).catch(function (error) {
          console.log("Error getting document:", error)
        });
    }
    this.Fragenliste = tmpFragen;
    this.Storyliste = tmpStories;
  }



  ngOnInit() {
      var docRef = firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten')
      docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("klappt");
      } else {
        // doc.data() will be undefined in this case
        firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').set({
          Initialisierung: true,
      }
        )}
    });
 }

      weiter1(){
        //ngif einfügen
        if((<HTMLInputElement>document.getElementById('Story1ja')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage1: true,
        })
      }

      else if ((<HTMLInputElement>document.getElementById('Story1nein')).checked) {
        firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage1: false,
        });
      }
    }
    weiter2(){
      if ((<HTMLInputElement>document.getElementById('Story2ja')).checked) {
        firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage2: true,
        })
      }
      else if ((<HTMLInputElement>document.getElementById('Story2nein')).checked) {
        firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage2: false,
        });
      }
    }
    weiter3(){
      if ((<HTMLInputElement>document.getElementById('Arbeitnehmer')).checked) {
        firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage3: 'Arbeitnehmer',
        })
      }
      else if ((<HTMLInputElement>document.getElementById('Selbstständig')).checked) {
        firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage3: 'Selbstständig',
        });
      }
      if ((<HTMLInputElement>document.getElementById('Student')).checked) {
        firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage3: 'Student',
        })
      }
      else if ((<HTMLInputElement>document.getElementById('Arbeitslos')).checked) {
        firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage3: 'Arbeitslos',
        });
      }
    }
    frage4wohnung(){
      this.BildHaus = false;
      if (this.BildWohnung == false) {
        this.BildWohnung = true;
      }
      else if (this.BildWohnung == true) {
        this.BildWohnung = false;
      }
    }
    frage4haus(){
      this.BildWohnung = false;
      if (this.BildHaus == false) {
        this.BildHaus = true;
      }
      else if (this.BildHaus == true) {
        this.BildHaus = false;
      }
    }
    weiter4(){
      if (this.BildHaus == false && this.BildWohnung == false) {
        console.log("Wähl etwas aus");
      }
      if (this.BildWohnung == true) {
        firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage4: 'Wohnung',
        }
        )
      }
      if (this.BildHaus == true) {
        firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage4: 'Haus',
        }
        )
      }
    }
      weiter5(){
        if((<HTMLInputElement>document.getElementById('Rechtsschutz1')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage5: true,
        })
      }
        else if((<HTMLInputElement>document.getElementById('Rechtsschutz2')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage5: false,
        });
      }
}
      weiter6a(){
        if((<HTMLInputElement>document.getElementById('auto1')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage6a: true
        })
      }
        else if((<HTMLInputElement>document.getElementById('auto2')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage6a: false
        });
      }
      }
      weiter6b(){
        if((<HTMLInputElement>document.getElementById('motorrad1')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage6b: true
        })
      }
        else if((<HTMLInputElement>document.getElementById('motorrad2')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage6b: false
        });
      }
      }
      weiter6c(){
        if((<HTMLInputElement>document.getElementById('fahrrad1')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage6c: true
        })
      }
        else if((<HTMLInputElement>document.getElementById('fahrrad2')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage6c: false
        });
      }
      }
      weiter6d(){
        if((<HTMLInputElement>document.getElementById('drohne1')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage6d: true
        })
      }
        else if((<HTMLInputElement>document.getElementById('drohne2')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage6d: false
        });
      }
      }
      frage7andere(){
        if((<HTMLInputElement>document.getElementById('frage7andere')).checked){
          this.Frage7andere=true;
        }
      }
      frage7keins(){
        if((<HTMLInputElement>document.getElementById('frage7keins')).checked){
          this.Frage7keins=true;     
        }
      }

      frage7pferd(){
        this.Frage7hund=false;
      if(this.Frage7pferd==false){
        this.Frage7pferd=true;
      }
      else if(this.Frage7pferd==true){
        this.BildWohnung=false;
      }
      }
      frage7hund(){
        this.Frage7pferd=false;
      if(this.Frage7hund==false){
        this.Frage7hund=true;
      }
      else if(this.Frage7hund==true){
        this.Frage7hund=false;
      }
      }
      weiter7(){
        if(this.Frage7hund==false && this.Frage7pferd==false){
          console.log("Wähl etwas aus");
        }
        if(this.Frage7hund==true){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage7: 'Hund',
        }
          )}
        if(this.Frage7pferd==true){
            firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
              Frage7: 'Pferd',
          }
          )}
        if((<HTMLInputElement>document.getElementById('frage7andere')).checked){
            this.Frage7pferd=false;
            this.Frage7hund=false;
            firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
              Frage7: 'Andere',
          })
        }
        if((<HTMLInputElement>document.getElementById('frage7keins')).checked){
            firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
              Frage7: 'Keins',
          })
      }
    }
weiter8(){
  if((<HTMLInputElement>document.getElementById('frage8ja')).checked){
    firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
      Frage8: true
  })
}
  else if((<HTMLInputElement>document.getElementById('frage8nein')).checked){
    firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
    Frage8: false
  });
}
}
weiter9(){
  if((<HTMLInputElement>document.getElementById('frage9ja')).checked){
    firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
      Frage9: true
  })
}
  else if((<HTMLInputElement>document.getElementById('frage9nein')).checked){
    firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
    Frage9: false
  });
}
}
weiter10(){
  if((<HTMLInputElement>document.getElementById('frage10ja')).checked){
    firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
      Frage10: true
  })
}
  else if((<HTMLInputElement>document.getElementById('frage10nein')).checked){
    firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
    Frage10: false
  });
}
}
weiter11(){
  if((<HTMLInputElement>document.getElementById('frage11ja')).checked){
    firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
      Frage11: true
  })
}
  else if((<HTMLInputElement>document.getElementById('frage11nein')).checked){
    firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
    Frage11: false
  });
}
}
frage12paar(){

  this.Frage12single=false;
  if(this.Frage12paar==false){
    this.Frage12paar=true;
  }
  else if(this.Frage12paar==true){
    this.Frage12paar=false;
  }
}
frage12single(){
  this.Frage12paar=false;
  if(this.Frage12single==false){
    this.Frage12single=true;
  }
  else if(this.Frage12single==true){
    this.Frage12single=false;
  }
}
weiter12(){
  if(this.Frage12paar==true){
    firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
      Frage12: 'Paar',
    })
  
}
else if(this.Frage12single==true){
  if(this.Frage12single==true){
    firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
      Frage12: 'Single',
  })
}
}
}
weiter13(){

}
zurueck1(){

}
zurueck2(){

}
zurueck3(){

}
zurueck4(){

}
zurueck5(){

}
zurueck6(){

}
zurueck7(){

}
zurueck8(){

}
zurueck9(){

}
zurueck10(){

}
zurueck11(){

}
zurueck12(){

}
zurueck13(){

}

}
let tmpFragen: string[]=[];
let tmpStories: string[]=[]; 
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
      _: questions.name
    }
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Questions(data._)
  }
}

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
      _: story.name
    }
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Stories(data._)
  }
}