import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements OnInit {
  public form = this.fb.group({
    Name: [
      '',
      {
        validators: [Validators.maxLength(20), Validators.required], // Festlegung auf maximal 20 Eingabezeichen im Namensfeld
        updateOn: 'change',
      },
    ],
    updateOn: 'change',
  });
  public name: string;
  public homeintro = true;
  public logo: boolean = true;
  public nameInput: boolean = false;
  public novaIntro: boolean = false;
  public docRef = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'));

  constructor(private router: Router, private fb: FormBuilder) {}
  public get showRequiredError() {
    // Name muss gesetzt sein
    return this.form.get('Name').errors?.required;
  }

  public get showCharLimitError() {
    // Name darf nur maximal 20 Eingabezeichen lang sein
    return this.form.get('Name').errors?.maxlength;
  }
  public ngOnInit() {
    this.docRef.get().then((doc) => {
      // schaut nach gesetztem Boolean für das Intro in der DB, innerhalb des Benutezrdokuments
      if (doc.exists) {
        this.homeintro = doc.data().homeintro;
        if (this.homeintro != false) {
          // wenn Wert true oder undefined ist update den Wert auf true
          this.docRef.update({ homeintro: true });
          this.homeintro = true;
        }
      }
      setTimeout(() => {
        // lässt das Logo beim  starten 2888 ms anzeigen
        this.logo = false;
        if (this.homeintro == true) {
          // seigt die Namenseingabe -> Intro wird abgespielt
          this.nameInput = true;
        } else if (this.homeintro == false) {
          // Intro wird nicht abgespielt & direkter rout zu home
          this.router.navigate(['/home']);
        }
      }, 2888);
    });
  }

  public saveName() {
    this.name = this.form.get('Name').value;
    firebase // eingegebener Name wir in DB in dem Benuter gespeichert
      .firestore()
      .collection('Benutzer')
      .doc(localStorage.getItem('hans'))
      .set({
        Name: this.name,
        homeintro: true,
      });
    this.nameInput = false; // Seite für die Namenseingabe wird ausgeschaltet
    this.novaIntro = true; // Seite mit Nova wird angezeigt
  }

  public continue() {
    this.router.navigate(['intro/insurance']); // routet zu insurance.component.ts
    this.novaIntro = false; // blendet Seite mit Nova aus
  }
}
