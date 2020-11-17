import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { Observable, Subject } from 'rxjs';
import { DataService } from ".././services/data.service";


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

          <img src="{{ imgArray[i] }}" class="img-responsive" />
          <br />

          <div class="RadioButtonsJaNein form-group">
            <div id="ButtonJa" class="form-check form-check-inline">
              <input
                type="radio"
                name="fragen"
                formControlName="fragen"
                value="ja"
                id="redundant2"
              />
              <label class="form-check-label"> ja </label>
            </div>

            <div id="ButtonNein" class="form-check form-check-inline">
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

  constructor(private dataservice: DataService) {
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
    const radio3 = (document.getElementById(
      'redundant2'
    ) as unknown) as HTMLInputElement;
    const radio4 = (document.getElementById(
      'redundant3'
    ) as unknown) as HTMLInputElement;

    if (radio3.checked || radio4.checked) {
      if (this.fragen.length > this.i) {
        $('#redundant2').prop('checked', false);
        $('#redundant3').prop('checked', false);
        this.fragenanzeige = this.fragen[this.i];
      }
      if(this.i>=this.fragen.length) {
        console.log("ende");
        console.log(this.i);
      }else {

      switch (this.i) {
        case 0:
          this.dbpush.update({
            Frage6: this.form.value.fragen,
          });
          break;
        case 1:
          this.dbpush.update({
            Frage7: this.form.value.fragen,
          });
          break;
        case 2:
          this.dbpush.update({
            Frage8: this.form.value.fragen,
          });
          break;
        case 3:
          this.dbpush.update({
            Frage9: this.form.value.fragen,
          });
          break;
        case 4:
          this.dbpush.update({
            Frage10: this.form.value.fragen,
          });
          break;
        case 5:
          this.dbpush.update({
            Frage11: this.form.value.fragen,
          });
          break;
      }
      this.i = this.i + 1;
      this.sendIndexradio();
    }
  }
  }

  zurueck() {
    if (this.fragen.length > this.i) {
      this.fragenanzeige = this.fragen[this.i - 2];
      this.i = this.i - 1;
    }
  }

sendIndexradio() :void{
  this.dataservice.sendIndexradio(this.i);
}

}


