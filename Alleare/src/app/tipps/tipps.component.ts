import { Component, OnInit } from '@angular/core';

import {AngularFireDatabase, AngularFireDatabaseModule, snapshotChanges, AngularFireList,} from '@angular/fire/database';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { Observable } from 'rxjs';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestore, AngularFirestoreCollection, ENABLE_PERSISTENCE } from '@angular/fire/firestore';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tipps',
  templateUrl: './tipps.component.html',
  styleUrls: ['./tipps.component.css']
})
export class TippsComponent {

  //Abfrage zum testen der Verbindung!!!!!!!!!!!!!
  /*async abfrage(){
    var docRef = firebase.firestore().collection('Fragenkatalog').doc('Fragen');

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
  }
    }

    )}*/
}
