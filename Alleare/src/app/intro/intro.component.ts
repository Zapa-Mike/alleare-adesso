import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import firebase from 'firebase';
import { stringify } from 'querystring';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements OnInit, DoCheck {
  form: FormGroup;
  public Name: string;

  //Routing
  logo: boolean = true;
  namenseingabe: boolean = false;
  novaIntro: boolean = false;
  novadialog: boolean = false;
  indexnovadialog: number;
  insurance: boolean = false;

  constructor(private dataservice: DataService) {
    this.form = new FormGroup({
      Name: new FormControl(),
    });
    this.dataservice.getIndexdialog();
    this.dataservice.currentIndex2.subscribe(
      (currentIndex2) => (this.indexnovadialog = currentIndex2)
    );

    firebase
      .firestore()
      .collection('Benutzer')
      .onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            //console.log("Name: ", change.doc.data());
          }

          var source = snapshot.metadata.fromCache ? 'local cache' : 'server';
          console.log('Data came from ' + source);
        });
      });
  }

  ngDoCheck() {
    if (this.indexnovadialog == 1) {
      this.insurance = false;
      this.novadialog = true;
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.logo = false;
      this.namenseingabe = true;
    }, 2888);
  }

  saveName() {
    this.Name = this.form.value.Name;
    firebase
      .firestore()
      .collection('Benutzer')
      .doc(localStorage.getItem('hans'))
      .set({
        Name: this.Name,
      });
    this.namenseingabe = false;
    this.novaIntro = true;
  }
  //Routing
  weiter() {
    this.novaIntro = false;
    this.insurance = true;
  }
}
