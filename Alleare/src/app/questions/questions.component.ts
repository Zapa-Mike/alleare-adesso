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
export class QuestionsComponent implements DoCheck {
  verweis = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Versicherungen');
  fragenkatalog = true;
  start = false;

  progressquestions: number = 0;
  progressquestionprozent: number = 0;
  fragenlaenge: number;

  constructor(private dataservice: DataService) {
    this.dataservice.getquestionprogress();
    this.dataservice.questionprogress.subscribe((questionprogress) => {
      this.progressquestions = questionprogress;
    });
    firebase
      .firestore()
      .collection('Progressbar')
      .doc('Fragenlänge')
      .get()
      .then((doc) => {
        this.fragenlaenge = doc.data().länge;
      });
  }

  weiter() {
    this.dataservice.resetquestionprogress();
    this.dataservice.addquestionprogress(0);
    this.verweis.get().then((querysnapshot) => {
      // Löscht Favorisierung bei erneutem Aufruf der Fragenkatalogs
      querysnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
    this.fragenkatalog = false;
    this.start = true;
  }

  ngDoCheck() {
    this.progressquestionprozent =
      (100 * this.progressquestions) / this.fragenlaenge;
  }
}
