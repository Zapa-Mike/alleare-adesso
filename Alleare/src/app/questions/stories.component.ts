import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '.././services/data.service';
import { Data, Router } from '@angular/router';
import { Story } from '../model/stories';
import { Radio } from '../model/stories';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-stories',
  template: `
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
          (click)="weiter()"
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
          (click)="zurueck()"
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

  dbpushData = firebase
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
    this.activeStory = this.Stories[0];
    this.activeRadio = this.Radio[0];
    const docIds = [].concat(
      this.Stories.map((o) => o.docidstory),
      this.Radio.map((o) => o.docidradio)
    );
    docIds.map((id) => {
      this.result.push({
        docid: id,
        antwort: '',
      });
    });
  }

  private async loadStories() {
    this.Stories = await this.questionService.getStories();
    const audios: HTMLAudioElement[] = this.questionService.audiofiles.map(
      (file) => new Audio(file)
    );
    this.Stories = this.Stories.map((o, index) => {
      // o ist die jeweilige Story und index ist der jeweilige Index
      return { ...o, audio: audios[index] }; //spread operator
    });
  }

  private async loadRadio() {
    this.Radio = await this.questionService.getradiostories();
  }

  private async loadData(): Promise<void> {
    await this.loadStories();
    await this.loadRadio();

    this.isLoading = false;
  }

  public async ngOnInit() {
    await this.loadData();
    this.setInitialData();
  }

  public playsound(): void {
    if (this.activeStory.audio.paused) {
      this.activeStory.audio.play();
    } else {
      this.activeStory.audio.pause();
    }
  }

  public weiter() {
    this.dataservice.addquestionprogress(1); //ProgressBar
    this.activeStory.audio.pause(); // Damit beim weiter gehen, die Aduio aufhört zu spielen

    if (this.index < this.Stories.length + this.Radio.length) {
      this.result[this.index].antwort = this.form.get('antwort').value;
      this.form.get('antwort').setValue('');
      this.index = this.index + 1;
      if (this.index < this.Stories.length) {
        this.setActiveStory(this.index);
      } else {
        this.storyvisible = false;
        this.setActiveRadio(this.index - this.Stories.length);
      }
      this.dataservice.addIndexTemp1(this.index);
    }

    if (this.index >= this.Stories.length + this.Radio.length) {
      this.pushData();
      this.router.navigate(['questions/options']);
    }
  }

  private setActiveRadio(index: number) {
    this.activeRadio = this.Radio[index];
  }

  private setActiveStory(index: number): void {
    this.activeStory = this.Stories[index];
  }

  private pushData(): void {
    this.result.map((o) => {
      this.dbpushData.doc(o.docid).set({
        antwort: o.antwort,
      });
    });
  }

  public zurueck() {
    this.dataservice.addquestionprogress(-1); //ProgressBar
    this.activeStory.audio.pause(); //Pausiert audio beim zurück gehen
    this.index = this.index - 1;
    if (this.index < this.Stories.length) {
      this.storyvisible = true;
    }
    if (this.storyvisible) {
      this.setActiveStory(this.index);
    } else {
      this.setActiveRadio(this.index - this.Stories.length);
    }
  }
}

interface Result {
  docid: string;
  antwort: string;
}
