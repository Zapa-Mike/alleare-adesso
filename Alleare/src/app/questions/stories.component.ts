import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';
import { Router } from '@angular/router';
import { Story } from '../model/stories';
import { Radio } from '../model/stories';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-stories',
  template: `
    <mat-progress-spinner
      class="loading"
      *ngIf="isLoading"
      mode="indeterminate"
    ></mat-progress-spinner>
    <div *ngIf="!isLoading">
      <div class="Frage">
        <div [formGroup]="form" class="card">
          <div>
            <img
              *ngIf="storyvisible"
              src="data:image/gif;base64,{{ activeStory.bildstory }}"
              class="img-responsive"
            />
            <img
              *ngIf="!storyvisible"
              src="data:image/gif;base64,{{ activeRadio.bildradio }}"
              class="img-responsive"
            />
            <div *ngIf="storyvisible" class="ImageStory">
              {{ activeStory.story }}
            </div>
            <!--"Anhören" Button-->
            <div *ngIf="storyvisible" class="AnhoerenButton">
              <button class="btn" id="anhoeren" (click)="playsound()">
                <img
                  class="anhoerenIcon"
                  src="/assets/icons/icon_anhoeren.svg"
                />
                Anhören
              </button>
            </div>
            <div class="RadioButtonsJaNein form-group">
              <div id="ButtonJa" class="form-check form-check-inline">
                <input
                  type="radio"
                  name="stories"
                  [formControl]="form.controls.antwort"
                  value="ja"
                  id="redundant"
                />
                <label class="form-check-label" for="redundant"> Ja </label>
              </div>
              <div id="ButtonNein" class="form-check form-check-inline">
                <input
                  type="radio"
                  name="stories"
                  [formControl]="form.controls.antwort"
                  value="nein"
                  id="redundant1"
                />
                <label class="form-check-label" for="redundant1"> Nein </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col rowVZ form-group">
        <button
          id="Wbutton"
          class="btn"
          (click)="continue()"
          [disabled]="form.controls.antwort.value.length < 1"
        >
          <!--Andere id als bei radio.component-->
          <img
            src="/assets/icons/icon_arrow_forward.svg"
            width="50"
            height="50"
          />
        </button>
        <button
          id="bbutton"
          class="btn"
          (click)="back()"
          [disabled]="this.index == 0"
        >
          <img src="/assets/icons/icon_arrow_back.svg" width="50" height="50" />
        </button>
      </div>
      <div class="grid-containerNovaSprechblase">
        <div
          class="bubble shadow bubble-bottom-right"
          contenteditable="false"
          *ngIf="storyvisible"
        >
          {{ activeStory.storyfrage }}
        </div>
        <div
          class="bubble shadow bubble-bottom-right"
          contenteditable="false"
          *ngIf="!storyvisible"
        >
          {{ activeRadio.radiofrage }}
        </div>
        <img
          src="/assets/nova/nova_fragenkatalog.png"
          width="100"
          height="100"
          id="NovaImage"
        />
      </div>
    </div>
  `,
  styleUrls: ['./questions.component.css'],
})
export class StoriesComponent implements OnInit {
  private result: Result[] = [];
  public isLoading = true;
  public form = this.fb.group({
    antwort: [''],
  });
  public Stories: Story[] = [];
  public Radio: Radio[] = [];
  public activeStory: Story;
  public activeRadio: Radio;
  public storyvisible: boolean = true;
  public index: number = 0;

  public dbpushData = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Fragenkatalog');

  constructor(
    private dataservice: DataService,
    private questionService: QuestionService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  private setInitialData() {
    // Daten werden gesetzt
    this.activeStory = this.Stories[this.index]; // Story werden in der richtigen Reihenfolge angezeigt
    this.activeRadio = this.Radio[this.index]; //  Radiofragen werden in der richtigen Reihenfolge angezeigt
    const docIds = [].concat(
      this.Stories.map((o) => o.docidstory), // filtert aus dem Array Stories die IDs herraus und tut sie in das Array docIds
      this.Radio.map((o) => o.docidradio) // filtet aus dem Array Radio die IDs herraus
    );
    docIds.map((id) => {
      this.result.push({
        docid: id,
        antwort: '', // tut alle Felder für die Antworten mit leeren Strings füllen
      });
    });
  }

  private async loadStories() {
    this.Stories = await this.questionService.getStories(); //wartet darauf das Árray Stories geladen wurden
    const audios: HTMLAudioElement[] = this.questionService.audiofiles.map(
      (file) => new Audio(file)
    );
    this.Stories = this.Stories.map((o, index) => {
      // o ist die jeweilige Story und index ist der jeweilige Index
      return { ...o, audio: audios[index] }; //Fügt jedem Feld eine Audio hinzu
    });
  }

  private async loadRadio() {
    this.Radio = await this.questionService.getradiostories(); // wartet darauf das alle Informationen in das Array Radio geladen wurden
  }

  private async loadData(): Promise<void> {
    // sobald alle Daten geladen wurden, wird der Loadingkreis ausgeschaltet
    await this.loadStories();
    await this.loadRadio();

    this.isLoading = false;
  }

  public async ngOnInit() {
    this.index = this.dataservice.getquestionstoryindex(); // bekommt übergeben wie viele Storyfragen es sind
    if (this.index == 0) {
      await this.loadData();
      this.setInitialData();
    }
    if (this.index > 0) {
      this.storyvisible = false;
      await this.loadData();
      this.setInitialData(); // Setzt alles in richtiger Reihenfolge in die Oberfläche
      this.index = this.index - 1;
      this.setActiveRadio(this.index - this.Stories.length); // Setzt alles in richtiger Reihenfolge in die Oberfläche
    }
  }

  public playsound(): void {
    if (this.activeStory.audio.paused) {
      this.activeStory.audio.play(); // spielt Audioausgabe in den Storys
    } else {
      this.activeStory.audio.pause(); // pausiert Audioausgabe in den Storys
    }
  }

  public continue() {
    this.dataservice.addquestionprogress(1); //ProgressBar
    if (this.index < this.Stories.length) {
      this.activeStory.audio.pause(); // Damit beim weiter gehen, die Audio aufhört zu spielen
    }
    if (this.index < this.Stories.length + this.Radio.length) {
      this.result[this.index].antwort = this.form.get('antwort').value; // Sammelt Antworten im Result Array
      this.form.get('antwort').setValue('');
      this.index = this.index + 1;
      this.dataservice.addquestionindex(this.index);
      if (this.index < this.Stories.length) {
        //setzt Storys
        this.setActiveStory(this.index);
      } else {
        // Setzt Radiofragen
        this.storyvisible = false;
        this.setActiveRadio(this.index - this.Stories.length);
      }
    }

    if (this.index >= this.Stories.length + this.Radio.length) {
      // nach allen Fragen wird das Template gewechselt
      this.pushData();
      this.router.navigate(['questions/options']);
    }
  }

  private setActiveRadio(index: number) {
    // Richtige Radiofrage wird gesetzt
    this.activeRadio = this.Radio[index];
  }

  private setActiveStory(index: number): void {
    // Richtige Story wird gesetzt
    this.activeStory = this.Stories[index];
  }

  private pushData(): void {
    // abgegebene Antworten werden gepusht
    this.result.map((o) => {
      this.dbpushData.doc(o.docid).set({
        // Setzt für die jeweilige ID die Antwort
        antwort: o.antwort,
      });
    });
  }

  public back() {
    this.dataservice.addquestionprogress(-1); //ProgressBar
    if (this.index < this.Stories.length) {
      this.activeStory.audio.pause(); //Pausiert audio beim zurück gehen
    }
    this.index = this.index - 1;
    if (this.index < this.Stories.length) {
      // Story wird angezeigt
      this.storyvisible = true;
    }
    if (this.storyvisible) {
      this.setActiveStory(this.index); // aktuelle Story
    } else {
      this.setActiveRadio(this.index - this.Stories.length);
    }
  }
}

interface Result {
  docid: string;
  antwort: string;
}
