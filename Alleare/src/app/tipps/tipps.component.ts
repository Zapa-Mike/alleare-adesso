import { Component, DoCheck, OnInit } from '@angular/core';

import {AngularFireDatabase, AngularFireDatabaseModule, snapshotChanges, AngularFireList,} from '@angular/fire/database';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { Observable } from 'rxjs';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestore, AngularFirestoreCollection, ENABLE_PERSISTENCE } from '@angular/fire/firestore';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import firebase, { database } from 'firebase';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tipps',
  templateUrl: './tipps.component.html',
  styleUrls: ['./tipps.component.css']
})
export class TippsComponent implements DoCheck {

  category: boolean=true;


  constructor(private dataservice:DataService){
  }

  ngDoCheck(){
  }
}
