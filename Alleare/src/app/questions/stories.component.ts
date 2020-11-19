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
        <img src="data:image/gif;base64,{{ imgArray[i] }}" class="img-responsive"/>

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
export class StoriesComponent implements DoCheck,OnInit {
  @Input() Fragenliste;
  @Input() Storyliste;
  @Input() test;
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
    db = firebase
    .firestore()
    .collection('Images_Story');
    db1 = firebase.firestore();
  i = parseInt(localStorage.getItem('storyIndex'));

  constructor(private dataservice: DataService) {
    console.log(this.i);
    
 
    this.form = new FormGroup({
      stories: new FormControl(),
    });

    
}
ngOnInit(): void {
  for (let i = 1; i <= 5; i++) {
    if(i==0) {
    } else {
      this.db
        .doc('Story' + i.toString().padStart(2, ''))
        .get()
        .then((doc) => {
          //Antworten des User
          this.imgArray.push(doc.data()._); 
    });
  }
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
        var index = (this.i).toString();
        localStorage.setItem('storyIndex', index);
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

