import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'tipps-categories',
  template: `
    <div class="ArticlesList" *ngIf="categoriesngif">
      <!--Überschrift-->
      <div class="title text-center">
        <h1>Tipps</h1>
      </div>
      <!--Kategorien tags-->
      <div class="categories">
        <button (click)="selectedCategories($event)" id="Sport" class="topic">
          Sport
        </button>
        <button
          (click)="selectedCategories($event)"
          id="Gesundheit"
          class="topic1"
        >
          Gesundheit
        </button>
        <button (click)="selectedCategories($event)" id="Reisen" class="topic">
          Reisen
        </button>
        <button
          (click)="selectedCategories($event)"
          id="Finanzen"
          class="topic"
        >
          Finanzen
        </button>
        <button
          (click)="selectedCategories($event)"
          id="Selbstständig"
          class="topic2"
        >
          Selbstständigkeit
        </button>
        <button
          (click)="selectedCategories($event)"
          id="Wirtschaft"
          class="topic"
        >
          Wirtschaft
        </button>
      </div>
      <!--Themenbereiche-->
      <div *ngFor="let array of array1">
        <div id="{{ array }}" class="box" (click)="transfer(array)">
          <p>{{ array }}</p>
        </div>
      </div>
    </div>
    <!--Articles-->
    <div class="ArticlesList" *ngIf="topicsngif">
      <div class="title text-center form-inline">
        <h1>{{ collection }}</h1>
        <!--Zurück Pfeil-->
        <img
          class="backArrow"
          (click)="backtocategories()"
          src="/assets/icons/icon_back_arrow.svg"
        />
      </div>
      <!--Schlagzeilen und Bilder-->
      <div *ngFor="let topic of topics">
        <div class="headlines" id="{{ topic }}" (click)="article(topic)">
          <div class="row articelBox">
            <div class="artTitle">{{ topic }}</div>
            <div class="artBild">
              <img
                src="data:image/gif;base64,{{ image }}"
                class="img-responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ArticlesList" *ngIf="articlesngif">
      <div class="title text-center form-inline">
        <h1>{{ articleHeading }}</h1>
        <!--Zurück Pfeil-->
        <img
          class="backArrow"
          (click)="backtotopics()"
          src="/assets/icons/icon_back_arrow.svg"
        />
      </div>
      <!-- Bilder im Artikel-->
      <img
        class="articleImage"
        id="articleImage"
        src="data:image/gif;base64,{{ image }}"
      />
      <div class="articleText">
        {{ articletext }}
      </div>
    </div>
  `,
  styleUrls: ['./tipps.component.css'],
})
export class categoriesComponent {
  public index: number = 0;
  public categories = [
    'Gesundheit',
    'Sport',
    'Reisen',
    'Finanzen',
    'Wirtschaft',
    'Selbstständigkeit',
  ];
  public dbget = firebase.firestore();
  public array1 = [];
  public topics = [];
  public collection: string;
  public docid: string;
  public articleHeading: string;
  public articletext: string;
  public articleImage: string;

  //Routing
  public categoriesngif: boolean = true;
  public topicsngif: boolean = false;
  public articlesngif: boolean = false;

  //Bilder
  public image: string;

  constructor() {}

  public selectedCategories(event: any) {
    // Unterkategorien der ausgewählten Kategorie werden geladen ins array1
    switch (event.target.id) {
      case 'Gesundheit': {
        this.empty();
        this.dbget
          .collection('Gesundheit')
          .get()
          .then((querysnapshot) => {
            querysnapshot.forEach((doc) => {
              this.array1.push(doc.id);
            });
          });
        this.collection = 'Gesundheit';
        break;
      }
      case 'Sport': {
        this.empty();
        this.dbget
          .collection('Sport')
          .get()
          .then((querysnapshot) => {
            querysnapshot.forEach((doc) => {
              this.array1.push(doc.id);
            });
          });
        this.collection = 'Sport';
        break;
      }
      case 'Reisen': {
        this.empty();
        this.dbget
          .collection('Reisen')
          .get()
          .then((querysnapshot) => {
            querysnapshot.forEach((doc) => {
              this.array1.push(doc.id);
            });
          });
        this.collection = 'Reisen';
        break;
      }
      case 'Finanzen': {
        this.empty();
        this.dbget
          .collection('Finanzen')
          .get()
          .then((querysnapshot) => {
            querysnapshot.forEach((doc) => {
              this.array1.push(doc.id);
            });
          });
        this.collection = 'Finanzen';
        break;
      }
      case 'Wirtschaft': {
        this.empty();
        this.dbget
          .collection('Wirtschaft')
          .get()
          .then((querysnapshot) => {
            querysnapshot.forEach((doc) => {
              this.array1.push(doc.id);
            });
          });
        this.collection = 'Wirtschaft';
        break;
      }
      case 'Selbstständig': {
        this.empty();
        this.dbget
          .collection('Selbstständigkeit')
          .get()
          .then((querysnapshot) => {
            querysnapshot.forEach((doc) => {
              this.array1.push(doc.id);
            });
          });
        this.collection = 'Selbstständigkeit';
        break;
      }
    }
  }
  private empty() {
    this.array1 = [];
    return this.array1;
  }

  public transfer(id: any) {
    // Titel der passenden Artikel werden in array1 geladen
    this.topics = [];
    this.docid = id;
    this.dbget
      .collection(this.collection)
      .doc(id)
      .collection('article')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.topics.push(doc.id);
        });
      });
    this.dbget
      .collection(this.collection)
      .doc(id)
      .get()
      .then((doc) => {
        this.image = doc.data().bild;
      });
    this.categoriesngif = false;
    this.topicsngif = true;
  }
  public article(topic: string) {
    // Inhalte des einzelnen Artikel werden geladen
    this.topicsngif = false;
    this.articlesngif = true;
    this.articleHeading = topic;
    //this.articletext
    this.dbget
      .collection(this.collection)
      .doc(this.docid)
      .collection('article')
      .doc(topic)
      .get()
      .then((doc) => {
        this.articletext = doc.data().article;
        this.articleImage = doc.data().bild;
      });
  }

  public backtocategories() {
    // Zurück zu der Übersicht
    this.topicsngif = false;
    this.categoriesngif = true;
  }
  public backtotopics() {
    // Zurück zur Auflistung der Artikel
    this.articlesngif = false;
    this.topicsngif = true;
  }
}
