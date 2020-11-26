import { Observable, Subject } from 'rxjs';
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
    private subject3 =new Subject<any>();
    currentIndex3=this.subject3.asObservable();
    private subject4 =new Subject<any>();
    currentIndex4=this.subject4.asObservable();

    constructor() {

    }
    sendIndexdialog(indexdialog:number)//Intro
    {
        this.subject.next(indexdialog);
    }

    getIndexdialog(): Observable<any>{//Intro
        return this.subject.asObservable();
    }

    sendIndexrouting1(indextemplate1:number){
        this.subject1.next(indextemplate1);
    }
    getIndexrouting1():Observable<any>{//Vorwärts
        return this.subject1.asObservable();
    }
    sendIndexrouting2(indextemplate1:number){//temp3 zurück
        this.subject2.next(indextemplate1);
    }
    getIndexrouting2():Observable<any>{
        return this.subject2.asObservable();
    }
    sendIndexrouting3(indextemplate1:number){//temp2 index speichern
        this.subject3.next(indextemplate1);
    }
    getIndexrouting3():Observable<any>{
        return this.subject3.asObservable();
    }
    sendIndexrouting4(indextemplate1:number){//temp1 index speichern
        this.subject4.next(indextemplate1);
    }
    getIndexrouting4():Observable<any>{
        return this.subject4.asObservable();
    }

}