import { Component, OnInit ,Input} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import firebase from 'firebase';
import { stringify } from 'querystring';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent {

form:FormGroup;
public Name:string;

  constructor() { 
    this.form= new FormGroup({
      Name: new FormControl()
      
    })

    firebase.firestore().collection("Benutzer")
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
  saveName(){
    
    this.Name=this.form.value.Name;
  firebase.firestore().collection('Benutzer').doc(localStorage.getItem('hans')).set({
        Name: this.Name,
      })
  }


}
