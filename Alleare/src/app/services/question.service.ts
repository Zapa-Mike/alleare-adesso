import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Dropdown, Story, VierRadio, ZweiBilder } from '../model/stories';
import { Radio } from '../model/stories';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  dbget = firebase.firestore().collection('Fragenkatalog');
  dbget1 = firebase.firestore().collection('Bundeslaender');

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
      .where('type', '==', 'radiostory') //filtert nach Fragen mit dem Typen:"radiostory"
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          data.push({ // speichert alle relevanten Informationenen für die "radiostory" in dem Array Story 
            storyfrage: doc.data().frage, //Frage
            docidstory: doc.id, // ID
            story: doc.data().story, // Story
            bildstory: doc.data().bild, // Bild
          });
        });
      });
    return data;
  }
  public async getradiostories(): Promise<Radio[]> {
    let data: Radio[] = [];
    await this.dbget
      .where('type', '==', 'zweiradio') // Filtert nach Fragen mit dem Typ "zweiradio"
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          data.push({//pusht alle relevanten Informationen von "zweiradio" in das Array Radio 
            radiofrage: doc.data().frage,//Frage
            docidradio: doc.id,//ID
            bildradio: doc.data().bild,//Bild
          });
        });
      });
    return data;
  }
  public async getvierradio():Promise<VierRadio[]>{
    let data :VierRadio[]=[]; // Filtert nach allen Fragen mit dem Typ "vierradio" 
    await this.dbget
      .where('type', '==', 'vierradio')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          data.push({ // Speichert alle relevanten Informationen von "vierradio" im Array Vierradio
            frage:doc.data().frage, //Frage
            docid: doc.id,//ID
            antwort1: doc.data().antwort1,//Antwortmöglichkeit 1
            antwort2: doc.data().antwort2,//Antwortmöglichkeit 2
            antwort3: doc.data().antwort3,//Antwortmöglichkeit 3
            antwort4: doc.data().antwort4//Antwortmöglichkeit 4
          });
        });
      });
    return data;
  }

  public async getzweibilder():Promise<ZweiBilder[]>{
    let data:ZweiBilder[]=[];
    await this.dbget
      .where('type', '==', 'zweibilder') //Filtert nach Fragen mit dem Typen "zweibilder"
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          data.push({ // Speichert alle relevanten Informationen für "zweibilder" in dem Array ZweiBilder
            frage:doc.data().frage, //Frage
            docid: doc.id,//ID
            bild1: doc.data().bild, // Bild für Antwort 1
            bild2: doc.data().bild2,// Bild für Antwort 2
            label1: doc.data().antwort1,// Antwort 1
            label2: doc.data().antwort2 // Antwort 2
          });
        });
      });
    return data;
  }
  public async getdropdown():Promise<Dropdown[]>{ // Speichert alle Bundesländer ab 
    let data:Dropdown[]=[];
    await this.dbget1
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          data.push({
            bundesland:doc.data().name,// Bundeslandname wird im Array Dropdown gespeichert
          })
        });
      });
      return data
  }
  public async getdropdownfrage():Promise<Dropdown[]>{
    let data:Dropdown[]=[];
    await this.dbget
      .where('type', '==', 'liste') // Filtert nach Fragen mit dem Typen "liste"
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          data.push({ // Frage für die Listenfrage wird in das Array Dropdown gepusht 
            frage:doc.data().frage, 
          })
        });
      });
      return data
  }
}