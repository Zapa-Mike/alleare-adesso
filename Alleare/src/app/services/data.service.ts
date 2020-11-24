import { Observable, Subject } from 'rxjs';
import { RadioComponent } from '../questions/radio.component';
import { StoriesComponent } from '../questions/stories.component';
import { QuestionsComponent } from '../questions/questions.component';
import firebase from 'firebase';
import { query } from '@angular/animations';


export class DataService {

    private subject = new Subject<any>();
    currentIndex=this.subject.asObservable();
    private subject1 =new Subject<any>();
    currentIndex1=this.subject1.asObservable();
    private subject2 =new Subject<any>();
    currentIndex2=this.subject2.asObservable();
    dbget=firebase.firestore().collection('Fragenkatalog');
    fragenstory:any[]=[];
    fragenradio:any[]=[];
    fragenvierradio:any[]=[];
    fragenzweibilder:any[]=[];
    fragenzweibilderzweiradio:any[]=[];
    fragenliste:any[]=[];

    constructor() {
        this.dbget.where("type","==","radiostory").get()
        .then((querysnapshot)=>{
            querysnapshot.forEach((doc)=>{
                this.fragenstory.push(doc.data()._);
                this.fragenstory.push(doc.data().story);
                this.fragenstory.push(doc.data().bild);
            })
        })
        console.log(this.fragenstory);

        this.dbget.where("type","==","zweiradio").get()
        .then((querysnapshot)=>{
            querysnapshot.forEach((doc)=>{
                this.fragenradio.push(doc.data()._);
                this.fragenradio.push(doc.data().bild);
            })
        })
        console.log(this.fragenradio);

        this.dbget.where("type","==","vierradio").get()
        .then((querysnapshot)=>{
            querysnapshot.forEach((doc)=>{
                this.fragenvierradio.push(doc.data()._);
            })
        })
        console.log(this.fragenvierradio);
        this.dbget.where("type","==","zweibilder").get()
        .then((querysnapshot)=>{
            querysnapshot.forEach((doc)=>{
                this.fragenzweibilder.push(doc.data()._);
            })
        })
        console.log(this.fragenzweibilder);
        this.dbget.where("type","==","zweibilderzweiradio").get()
        .then((querysnapshot)=>{
            querysnapshot.forEach((doc)=>{
                this.fragenzweibilderzweiradio.push(doc.data()._);
            })
        })
        console.log(this.fragenzweibilderzweiradio);
        this.dbget.where("type","==","liste").get()
        .then((querysnapshot)=>{
            querysnapshot.forEach((doc)=>{
                this.fragenliste.push(doc.data()._);
            })
        })
        console.log(this.fragenliste);

    }

    sendIndexradio(indexradio:number){
    this.subject.next(indexradio);
    }

    getIndexradio() : Observable<any>{
        return this.subject.asObservable();
    }

    sendIndexstory(indexstory:number){
        this.subject1.next(indexstory);
    }

    getIndexstory(): Observable<any>{
        return this.subject1.asObservable();
    }

    sendIndexdialog(indexdialog:number)
    {
        this.subject2.next(indexdialog);
    }

    getIndexdialog(): Observable<any>{
        return this.subject2.asObservable();
    }

}