import { Observable, Subject } from 'rxjs';

export class DataService {
  private subject = new Subject<any>();
  currentIndex = this.subject.asObservable();
  private subject1 = new Subject<any>();
  currentIndex1 = this.subject1.asObservable();
  private subject2 = new Subject<any>();
  currentIndex2 = this.subject2.asObservable();

  indexvonTemp2zuTemp3: number;
  indexTemp2: number;
  indexvonTemp3zuTemp2: number;
  indexTemp1: number;

  indexquizrouting: number = 0;

  indexvier: number = 0;
  indexzwei: number = 0;

  constructor() {}
  sendIndexdialog(
    indexdialog: number //Intro
  ) {
    this.subject2.next(indexdialog);
  }

  getIndexdialog(): Observable<any> {
    //Intro
    return this.subject2.asObservable();
  }

  sendIndexrouting1(indextemplate1: number) {
    // die Anzahl der Seiten von Temp 2 (options) wird Temp 3 (dropDown) übergeben
    this.indexvonTemp2zuTemp3 = indextemplate1;
  }
  getIndexrouting1() {
    return this.indexvonTemp2zuTemp3;
  }
  sendIndexrouting2(indextemplate3: number) {
    // die Anzahl der Seiten von Temp 2 (options) wird von Temp 3 (dropDown) an Temp2 übergeben
    this.indexvonTemp3zuTemp2 = indextemplate3;
  }
  getIndexrouting2() {
    return this.indexvonTemp3zuTemp2;
  }
  addindexTemp2(index) {
    this.indexTemp2 = index;
  }
  getIndexTemp2() {
    // Temp2 (options) fängt übergebenen Index ab und kann dadurch beim zurueckgehen die letzte Seite anzeigen
    return this.indexTemp2;
  }
  addIndexTemp1(index) {
    this.indexTemp1 = index;
  }
  getIndexTemp1() {
    // Temp1 (stories) fängt übergebenen Index ab und kann dadurch beim zurueckgehen die letzte Seite anzeigen
    return this.indexTemp1;
  }
  addquizrouting(index) {
    //Für routing in der quizcomponent.ts
    this.indexquizrouting = index;
  }
  getquizrouting() {
    return this.indexquizrouting;
  }
  addindexspeichernvier(index) {
    //Index speicher, damit bei einem neuen aufruf der index nicht zurück gesetzt wird.
    this.indexvier = index;
  }
  getindexspeichernvier() {
    return this.indexvier;
  }
  addindexspeichernzwei(index) {
    this.indexzwei = index;
  }
  getindexspeichernzwei() {
    return this.indexzwei;
  }
}
