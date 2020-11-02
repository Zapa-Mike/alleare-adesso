import { Component, OnInit } from '@angular/core';

import {AngularFireDatabase, AngularFireDatabaseModule, snapshotChanges, AngularFireList,} from '@angular/fire/database';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { Observable } from 'rxjs';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, ENABLE_PERSISTENCE } from '@angular/fire/firestore';
import { DatabaseReference } from '@angular/fire/database/interfaces';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {


}