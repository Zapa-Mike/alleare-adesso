import { Component, DoCheck, OnInit } from '@angular/core';
import { QuerySnapshot } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import firebase from 'firebase';
import { QuestionResponseMapper } from 'src/app/services/question-response.mapper';
import { DataService } from '../../services/data.service';
import { QuestionResponse, QuestionType } from './models/story-models.model';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['../questions.component.css'],
})
export class StoriesComponent implements OnInit, DoCheck {
  public questionData: QuestionResponse[];
  public activeQuestion: QuestionResponse;
  form: FormGroup;
  index: number = 0;

  //Variablen zum speichern der Liste
  bildstory: any[] = [];
  bildradio: any[] = [];
  storyfrage: string[] = [];
  radiofrage: string[] = [];
  story: string[] = [];
  docidstory: any[] = [];
  docidradio: any[] = [];
  storyvisible: boolean = true;
  public get isStoryVisible(): boolean {
    return this.activeQuestion.type === QuestionType.radiostory;
  }

  storyanzeige: string;
  fragenanzeige: string;
  bildanzeige: any;
  storiesausblenden: boolean = false;
  indexstory = [];
  jalla: boolean;

  counter = 2;

  dbpush = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Fragenkatalog');
  dbget = firebase.firestore().collection('Fragenkatalog');

  private audiofiles: string[] = [
    '/assets/StoryAudio/Story1.mp3',
    '/assets/StoryAudio/Story2.mp3',
    '/assets/StoryAudio/Story3.mp3',
    '/assets/StoryAudio/Story4.mp3',
    '/assets/StoryAudio/Story5.mp3',
    '/assets/StoryAudio/Story6.mp3',
  ];
  private currentaudio: HTMLAudioElement;

  constructor(
    private dataservice: DataService,
    private mapper: QuestionResponseMapper
  ) {
    this.form = new FormGroup({
      stories: new FormControl(),
      weiter: new FormControl(),
      zurueck: new FormControl(),
    });
  }

  public async ngOnInit() {
    const data = await this.dbget.get();
    this.questionData = this.setQuestionData(data);
    this.activeQuestion = this.questionData[0];
    this.currentaudio = new Audio(this.audiofiles[0]);
  }

  private setQuestionData(
    data: QuerySnapshot<firebase.firestore.DocumentData>
  ): QuestionResponse[] {
    let questions: QuestionResponse[] = [];
    data.forEach((element) => {
      questions.push(this.mapper.mapToQuestionResponse(element.data()));
    });

    return questions;
  }

  public ngDoCheck() {
    const weiterButton = (document.getElementById(
      'Wbutton'
    ) as unknown) as HTMLInputElement;
    if ($('input[name=stories]:checked').length > 0) {
      // setzt alle gecheckten Radiobuttons zurück, wenn nächste Seite aufgerufen wird
      weiterButton.disabled = false;
    }
    if (this.index < this.storyfrage.length) {
      this.storyvisible = true;
      this.fragenanzeige = this.storyfrage[this.index];
      this.storyanzeige = this.story[this.index];
      this.bildanzeige = this.bildstory[this.index];
      this.jalla = true;
    }
    if (this.index > this.storyfrage.length - 1) {
      this.storyvisible = false;
      this.fragenanzeige = this.radiofrage[this.index - this.storyfrage.length];
      this.bildanzeige = this.bildradio[this.index - this.storyfrage.length];
      this.jalla = false;
    }
    //Pfeil bei Frage1 wird ausgeblendet
    const zurueck1 = (document.getElementById(
      'bbutton'
    ) as unknown) as HTMLInputElement;
    if (this.index < 1) {
      zurueck1.disabled = true;
    } else if (this.index >= 1) {
      zurueck1.disabled = false;
    }
  }
  public playsound() {
    if (this.counter % 2 == 0) {
      this.currentaudio.play();
      console.log('play');
    } else {
      this.currentaudio.pause();
      console.log('stop');
    }
    this.counter = this.counter + 1;
  }

  public weiter() {
    this.form.get('weiter').disable();

    if ($('input[name=stories]:checked').length > 0) {
      // setzt alle gecheckten Radiobuttons zurück, wenn nächste Seite aufgerufen wird
      $('#redundant').prop('checked', false);
      $('#redundant1').prop('checked', false);
    }
    if (this.index < this.storyfrage.length + this.radiofrage.length) {
      this.index = this.index + 1;
      this.currentaudio = new Audio(this.audiofiles[this.index]);
      this.dataservice.addIndexTemp1(this.index);
    }

    if (this.index >= this.storyfrage.length + this.radiofrage.length) {
      this.dataservice.sendIndexrouting1(2); //Weiter
      this.push();
    } else {
      this.push();
    }
  }
  public push() {
    const radio1 = (document.getElementById(
      'redundant'
    ) as unknown) as HTMLInputElement;
    const radio2 = (document.getElementById(
      'redundant1'
    ) as unknown) as HTMLInputElement;

    if (radio1.checked || radio2.checked) {
      if (this.radiofrage.length + this.storyfrage.length > this.index) {
        $('#redundant').prop('checked', false);
        $('#redundant1').prop('checked', false);
        if (this.index <= 0) {
        }
      }
    }
    if (this.jalla == true) {
      this.dbpush.doc(this.docidstory[this.index - 1]).set({
        antwort: this.form.value.stories,
      });
    }
    if (this.jalla == false) {
      this.dbpush
        .doc(this.docidradio[this.index - this.storyfrage.length - 1])
        .set({
          antwort: this.form.value.stories,
        });
    }
  }
  public zurueck() {
    this.index = this.index - 1;
    const zurueck1 = (document.getElementById(
      'bbutton'
    ) as unknown) as HTMLInputElement;
    if (this.index < 1) {
      zurueck1.disabled = true;
    } else if (this.index >= 1) {
      zurueck1.disabled = false;
    }
  }
}
