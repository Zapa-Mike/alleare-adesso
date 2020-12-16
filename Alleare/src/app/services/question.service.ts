import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { Story } from '../model/stories';
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
}
