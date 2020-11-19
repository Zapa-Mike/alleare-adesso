import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';

@Component({
  selector: 'app-stories',
  template: `
    <div class="Frage">
      <div [formGroup]="form" class="card">
        <div>
          <img src="{{ imgArray[i] }}" class="img-responsive" />

          <div class="ImageStory">
            {{ storyanzeige }}
          </div>
          <!--"Anhören" Button-->
          <div class="AnhoerenButton">
            <button class="btn" id="anhoeren">
              <img class="anhoerenIcon" src="/assets/icons/icon_anhoeren.svg" />
              Anhören
            </button>
          </div>

          <div class="RadioButtonsJaNein form-group">
            <div id="ButtonJa" class="form-check form-check-inline">
              <input
                type="radio"
                name="stories"
                formControlName="stories"
                value="ja"
                id="redundant"
              />
              <label class="form-check-label"> Ja </label>
            </div>
            <div id="ButtonNein" class="form-check form-check-inline">
              <input
                type="radio"
                name="stories"
                formControlName="stories"
                value="nein"
                id="redundant1"
              />
              <label class="form-check-label"> Nein </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col rowVZ form-group">
      <button id="Wbutton" class="btn" (click)="push()">
        <!--Andere id als bei radio.component-->
        <img
          src="/assets/icons/icon_arrow_forward.svg"
          width="50"
          height="50"
        />
      </button>
      <button id="bbutton" class="btn" (click)="zurueck()">
        <img src="/assets/icons/icon_arrow_back.svg" width="50" height="50" />
      </button>
    </div>

    <div class="grid-containerNovaSprechblase">
      <div class="bubble shadow bubble-bottom-right" contenteditable="false">
        {{ fragenanzeige }}
      </div>

      <img
        src="/assets/nova/nova_fragenkatalog.png"
        width="100"
        height="100"
        id="NovaImage"
      />
    </div>
  `,
  styleUrls: ['./questions.component.css'],
})
export class StoriesComponent implements DoCheck {
  @Input() Fragenliste;
  @Input() Storyliste;
  @Input() test;
  i: number = 0;
  form: FormGroup;
  test2: string;
  imgArray = [];
  fragen: string[] = [];
  fragenanzeige: string;
  story: string[] = [];
  storyanzeige: string;
  Fragen = ['Frage1', 'Frage2', 'Frage3', 'Frage4', 'Frage5'];
  dbpush = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Fragenkatalog');

  constructor(private dataservice: DataService) {
    this.imgArray = [
      '/assets/fragenkatalog/story_shopping.png',
      '/assets/fragenkatalog/story_bahnhof.png',
      '/assets/fragenkatalog/rechtliche_Hilfe.png',
      '/assets/fragenkatalog/wunsch.png',
      '/assets/fragenkatalog/immobilien_sparen.png',
    ];

    this.form = new FormGroup({
      stories: new FormControl(),
    });

    if (localStorage.getItem('storyIndex') == null) {
      this.i = this.i;
    } else {
      this.i = parseInt(localStorage.getItem('storyIndex'));
    }
  }

  ngDoCheck(): void {
    this.fragen = this.Fragenliste;
    this.story = this.Storyliste;
    this.storyanzeige = this.story[this.i];
    this.fragenanzeige = this.fragen[this.i];
    const zurueck1 = (document.getElementById(
      'bbutton'
    ) as unknown) as HTMLInputElement;
    if (this.i < 1) {
      zurueck1.disabled = true;
    } else if (this.i >= 1) {
      zurueck1.disabled = false;
    }
  }

  push() {
    const radio1 = (document.getElementById(
      'redundant'
    ) as unknown) as HTMLInputElement;
    const radio2 = (document.getElementById(
      'redundant1'
    ) as unknown) as HTMLInputElement;

    if (radio1.checked || radio2.checked) {
      if (this.fragen.length > this.i) {
        $('#redundant').prop('checked', false);
        $('#redundant1').prop('checked', false);
        this.fragenanzeige = this.fragen[this.i];
        if (this.i <= 0) {
        }
      }

      if (this.story.length > this.i) {
        this.storyanzeige = this.story[this.i];
      }
      if (this.i == this.fragen.length) {
        console.log('ende');
        console.log(this.i);
      } else {
        switch (this.i) {
          case 0:
            this.dbpush.doc(this.Fragen[this.i]).set({
              _: this.form.value.stories,
            });
            break;
          case 1:
            this.dbpush.doc(this.Fragen[this.i]).set({
              _: this.form.value.stories,
            });
            break;
          case 2:
            this.dbpush.doc(this.Fragen[this.i]).set({
              _: this.form.value.stories,
            });
            break;
          case 3:
            this.dbpush.doc(this.Fragen[this.i]).set({
              _: this.form.value.stories,
            });
            break;
          case 4:
            this.dbpush.doc(this.Fragen[this.i]).set({
              _: this.form.value.stories,
            });
            break;
        }

        this.i = this.i + 1;
        this.sendIndexstory();
      }
    }
  }

  zurueck() {
    const zurueck1 = (document.getElementById(
      'bbutton'
    ) as unknown) as HTMLInputElement;
    if (this.i < 1) {
      zurueck1.disabled = true;
    } else if (this.i >= 1) {
      zurueck1.disabled = false;
    }
    if (this.fragen.length > this.i) {
      this.fragenanzeige = this.fragen[this.i - 2];
      var index = (this.i).toString();
        localStorage.setItem('storyIndex', index);
      this.i = this.i - 1;
    }
  }

  sendIndexstory(): void {
    this.dataservice.sendIndexstory(this.i);
  }
}
