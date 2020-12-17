import { Observable, Subject } from 'rxjs';
import firebase from 'firebase';


export class DataService {
    homeintro= true;
    docRef = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'));

    //Progressbar
    private progress = new Subject<any>();
    questionprogress=this.progress.asObservable();
    saveprogress:number=0;

    //Evaluation zu fav in Infos
    displayfav:boolean;
    //Quiz
    indexquizrouting:number=0;
    indexvier:number=0;
    indexzwei:number=0;
    //Home
    headervisible:boolean = true;
    //QuestionsIndex
    indexstory:number=0;
    indexoptions:number=0;
    constructor() {
        this.docRef.get().then((doc) => {
            if (doc.exists) {
              this.homeintro  = doc.data().homeintro
            }
            if(this.homeintro == false){
                this.headervisible=false;
            }
          });
     
        }

    //Fragenkatalog(Speichern der Indizes)
    addquestionindex(indexstory:number){
        this.indexstory=indexstory;
    }
    addquestionindex2(indexoptions){
        this.indexoptions=indexoptions;
    }
    getquestionstoryindex(){
        return this.indexstory;
    }
    getquestionoptionsindex(){
        return this.indexoptions;
    }
    deleteindexoption(){
        this.indexoptions=0;
    }
    deleteindexstory(){
        this.indexstory=0;
    }
    //Ende Fragenkatalog

    addquizrouting(index){  //Für routing in der quizcomponent.ts
        this.indexquizrouting=index;
    }
    getquizrouting(){
        return this.indexquizrouting;
    }
    addindexspeichernvier(index){ //Index speichern, damit bei einem neuen aufruf der index nicht zurück gesetzt wird.
        this.indexvier=index;
    }
    getindexspeichernvier(){
        return this.indexvier;
    }
    addindexspeichernzwei(index){
        this.indexzwei=index;
    }
    getindexspeichernzwei(){
        return this.indexzwei;
    }
    sendHeader(grau){//Graue Balken wird aus dem Header entnommen
        this.headervisible= grau;
    }
    getHeader(){
        return this.headervisible;
    }
    addquestionprogress(progress){
        this.saveprogress=this.saveprogress+progress
        this.progress.next(this.saveprogress)
    }
    getquestionprogress():Observable<number>{
        return this.progress.asObservable();
    }
    resetquestionprogress(){
        this.saveprogress=0
        this.progress.next(this.saveprogress);
    }
    setfav(boolean){ //Von Evaluation routing zum favorisierten Infobereich
        this.displayfav=boolean;
    }
    getfav(){
        return this.displayfav
    }
    
}