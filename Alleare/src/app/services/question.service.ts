import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { Story, VierRadio, ZweiBilder } from '../model/stories';
import { Radio } from '../model/stories';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  dbget = firebase.firestore().collection('Fragenkatalog');

  public audiofiles = [
    '/assets/StoryAudio/Story1.mp3',
    '/assets/StoryAudio/Story2.mp3',
    '/assets/StoryAudio/Story3.mp3',
    '/assets/StoryAudio/Story4.mp3',
    '/assets/StoryAudio/Story5.mp3',
    '/assets/StoryAudio/Story6.mp3',
  ];

  constructor() {}

  public async getStories(): Promise<Story[]> {
    let data: Story[] = [];
    await this.dbget
      .where('type', '==', 'radiostory')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          data.push({
            storyfrage: doc.data().frage,
            docidstory: doc.id,
            story: doc.data().story,
            bildstory: doc.data().bild,
          });
        });
      });
    return data;
  }
  public async getradiostories(): Promise<Radio[]> {
    let data: Radio[] = [];
    await this.dbget
      .where('type', '==', 'zweiradio')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          data.push({
            radiofrage: doc.data().frage,
            docidradio: doc.id,
            bildradio: doc.data().bild,
          });
        });
      });
    return data;
  }
  public async getvierradio():Promise<VierRadio[]>{
    let data :VierRadio[]=[];
    await this.dbget
      .where('type', '==', 'vierradio')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          data.push({
            frage:doc.data().frage,
            docid: doc.id,
            antwort1: doc.data().antwort1,
            antwort2: doc.data().antwort2,
            antwort3: doc.data().antwort3,
            antwort4: doc.data().antwort4
          });
        });
      });
    return data;
  }

  public async getzweibilder():Promise<ZweiBilder[]>{
    let data:ZweiBilder[]=[];
    await this.dbget
      .where('type', '==', 'zweibilder')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          data.push({
            frage:doc.data().frage,
            docid: doc.id,
            bild1: doc.data().bild,
            bild2: doc.data().bild2,
            label1: doc.data().antwort1,
            label2: doc.data().antwort2
          });
        });
      });
    return data;
  }
}