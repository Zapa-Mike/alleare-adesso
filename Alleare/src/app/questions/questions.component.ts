import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {


  
  constructor() { 
    
    firebase.firestore().collection("Fragenkatalog")
  .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
              console.log("Name: ", change.doc.data());
          }

          var source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
      });
  });

    
  }
  Fragenliste:string[] =[];
  Storyliste:string[] =[];
  BildWohnung:boolean=false;
  BildHaus:boolean=false;

  
  ngOnInit() {
//Kann verbessert werden!
      const test=firebase.firestore().collection("Fragenkatalog").doc("Fragen");
      test.get().then((doc) => {
          this.Fragenliste[0] = doc.data().Frage0001;
          this.Fragenliste[1] =doc.data().Frage0010;
          this.Fragenliste[2] =doc.data().Frage0011;
          this.Fragenliste[3] =doc.data().Frage0100;
          this.Fragenliste[4] =doc.data().Frage0101;
          this.Fragenliste[5] =doc.data().Frage0110;
          this.Fragenliste[6] =doc.data().Frage0111;
          this.Fragenliste[7] =doc.data().Frage1000;
          this.Fragenliste[8] =doc.data().Frage1001;
          this.Fragenliste[9] =doc.data().Frage1010;
          this.Fragenliste[10] =doc.data().Frage1011;
          this.Fragenliste[11] =doc.data().Frage1100;
          this.Fragenliste[12] =doc.data().Frage1101;
          this.Storyliste[0] =doc.data().Story0001;
          this.Storyliste[1] =doc.data().Story0010;
          this.Storyliste[2] =doc.data().Story0101;
          this.Storyliste[3] =doc.data().Story1000;
          this.Storyliste[4] =doc.data().Story1001;
          this.Storyliste[5] =doc.data().Story1010;
      }
      )}

      weiter1(){
        //ngif einfügen
        if((<HTMLInputElement>document.getElementById('Story1ja')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage1: true,
        })
      }
        else if((<HTMLInputElement>document.getElementById('Story1nein')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage1: false,
        });
        }
      }
      weiter2(){
        if((<HTMLInputElement>document.getElementById('Story2ja')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage2: true,
        })
      }
        else if((<HTMLInputElement>document.getElementById('Story2nein')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage2: false,
        });
        }
      }
      weiter3(){
        if((<HTMLInputElement>document.getElementById('Arbeitnehmer')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage3: 'Arbeitnehmer',
        })
      }
        else if((<HTMLInputElement>document.getElementById('Selbstständig')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage3: 'Selbstständig',
        });
        }
        if((<HTMLInputElement>document.getElementById('Student')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage3: 'Student',
        })
      }
        else if((<HTMLInputElement>document.getElementById('Arbeitslos')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage3: 'Arbeitslos',
        });
        }
      }
      frage4wohnung(){
        this.BildHaus=false;
      if(this.BildWohnung==false){
        this.BildWohnung=true;
      }
      else if(this.BildWohnung==true){
        this.BildWohnung=false;
      }
      }
      frage4haus(){
        this.BildWohnung=false;
        if(this.BildHaus==false){
          this.BildHaus=true;
        }
        else if(this.BildHaus==true){
          this.BildHaus=false;
        }
      }
      weiter4(){
        if(this.BildHaus==false && this.BildWohnung==false){
          console.log("Wähl etwas aus");
        }
        if(this.BildWohnung==true){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage4: 'Wohnung',
        }
          )}
          if(this.BildHaus==true){
            firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
              Frage4: 'Haus',
          }
          )}
      }
      weiter5(){
        if((<HTMLInputElement>document.getElementById('Rechtsschutz1')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
            Frage5: true
        })
      }
        else if((<HTMLInputElement>document.getElementById('Rechtsschutz2')).checked){
          firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).collection('Fragenkatalog').doc('Antworten').update({
          Frage5: false
        });
      }
      
}
}
