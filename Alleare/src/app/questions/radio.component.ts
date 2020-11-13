import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';

@Component({
  selector: 'app-radio',
  template: `
    <br />
    <br />
    <br />

    <div class="Frage">
      <div [formGroup]="form" class="card">
        <div>
          <div class="ImageStory"><!--Story "Frage"-->{{ fragenanzeige }}</div>
          <div class="form-check form-check-inline">
            <img src="{{ imgArray[i] }}" class="img-responsive" />
          </div>
          <input
            type="radio"
            name="fragen"
            formControlName="fragen"
            value="ja"
            id="redundant2"
          />
          <label class="form-check-label"> ja </label>
          <input
            type="radio"
            name="fragen"
            formControlName="fragen"
            value="nein"
            id="redundant3"
          />
          <label class="form-check-label"> nein </label>
        </div>
      </div>
      <div class="col rowVZ">
        <button id="Vbutton" class="btn" (click)="push()">
          <img
            src="/assets/icons/icon_arrow_forward.svg"
            width="50"
            height="50"
          />
        </button>
        <button id="Zbutton" class="btn" (click)="zurueck()">
          <img src="/assets/icons/icon_arrow_back.svg" width="50" height="50" />
        </button>
      </div>

      <div class="d-flex Nova justify-content-end">
        <img
          src="/assets/nova/nova_intro_rechts.png"
          width="100"
          height="100"
          id="NovaImage"
        />
      </div>
    </div>
  `,
  styleUrls: ['./questions.component.css'],
})
export class RadioComponent implements DoCheck {
  form: FormGroup;
  fragen: string[];
  i: number = 0;
  fragenanzeige: string;
  @Input() Fragenliste;
  imgArray = [];
  dbpush = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Fragenkatalog')
    .doc('Antworten');

  constructor() {
    this.form = new FormGroup({
      fragen: new FormControl(),
    });

    this.imgArray = [
      '/assets/fragenkatalog/auto.png',
      '/assets/fragenkatalog/motorrad.png',
      '/assets/fragenkatalog/fahrrad.png',
      '/assets/fragenkatalog/drohne.png',
      '/assets/fragenkatalog/sport.png',
    ];
  }

  ngDoCheck() {
    this.fragen = this.Fragenliste;
    this.fragenanzeige = this.Fragenliste[this.i];
  }

  push() {
    const radio3 = document.getElementById('redundant2') as HTMLInputElement;
    const radio4 = document.getElementById('redundant3') as HTMLInputElement;

    if (radio3.checked || radio4.checked) {
      if (this.fragen.length > this.i) {
        this.fragenanzeige = this.fragen[this.i];
      }

      switch (this.i) {
        case 0:
          this.dbpush.update({
            Frage7: this.form.value.fragen,
          });
          break;
        case 1:
          this.dbpush.update({
            Frage8: this.form.value.fragen,
          });
          break;
        case 2:
          this.dbpush.update({
            Frage9: this.form.value.fragen,
          });
          break;
        case 3:
          this.dbpush.update({
            Frage10: this.form.value.fragen,
          });
          break;
        case 4:
          this.dbpush.update({
            Frag11: this.form.value.fragen,
          });
          break;
        case 5:
          this.dbpush.update({
            Frag12: this.form.value.fragen,
          });
          break;
      }
      this.i = this.i + 1;
    }
  }

  zurueck() {
    if (this.fragen.length > this.i) {
      this.fragenanzeige = this.fragen[this.i - 2];
      this.i = this.i - 1;
    }
  }
}

$(document).ready(function () {
  $('#Vbutton').click(function () {
    $('#redundant2').prop('checked', false);
  });
  $('#Vbutton').click(function () {
    $('#redundant3').prop('checked', false);
  });
});
