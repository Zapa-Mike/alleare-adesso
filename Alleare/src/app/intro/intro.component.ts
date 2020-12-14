import { Component, OnInit, DoCheck } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements OnInit, DoCheck {
  public form = this.fb.group({
    Name: [
      '',
      {
        validators: [Validators.maxLength(20)],
      },
    ],
  });
  public Name: string;
  homeintro = true;
  //Routing
  logo: boolean = true;
  namenseingabe: boolean = false;
  novaIntro: boolean = false;
  novadialog: boolean = false;
  indexnovadialog: number;
  insurance: boolean = false;
  docRef = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'));

  constructor(
    private router: Router,
    private dataservice: DataService,
    private fb: FormBuilder
  ) {
    this.dataservice.getIndexdialog();
    this.dataservice.currentIndex2.subscribe(
      (currentIndex2) => (this.indexnovadialog = currentIndex2)
    );
  }

  ngDoCheck() {
    if (this.indexnovadialog == 1 && this.homeintro == true) {
      this.insurance = false;
      this.novadialog = true;
    }
  }

  ngOnInit() {
    this.logo = true;
    this.novadialog = false;
    this.insurance = false;
    this.namenseingabe = false;
    this.novaIntro = false;

    this.docRef.get().then((doc) => {
      if (doc.exists) {
        this.homeintro = doc.data().homeintro;
        if (this.homeintro != false) {
          this.docRef.update({ homeintro: true });
          this.homeintro = true;
        }
      }
      console.log(this.homeintro);
      setTimeout(() => {
        this.logo = false;

        if (this.homeintro == true) {
          this.namenseingabe = true;
        } else if (this.homeintro == false) {
          this.router.navigate(['/home']);
        }
      }, 2888);
    });
  }

  saveName() {
    this.Name = this.form.get('Name').value;
    firebase
      .firestore()
      .collection('Benutzer')
      .doc(localStorage.getItem('hans'))
      .set({
        Name: this.Name,
        homeintro: true,
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
