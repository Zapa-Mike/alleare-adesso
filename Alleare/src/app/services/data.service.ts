import { Observable, Subject } from 'rxjs';
import { RadioComponent } from '../questions/radio.component';
import { StoriesComponent } from '../questions/stories.component';
import { QuestionsComponent } from '../questions/questions.component';

export class DataService {

    private subject = new Subject<any>();
    currentIndex=this.subject.asObservable();
    private subject1 =new Subject<any>();
    currentIndex1=this.subject1.asObservable();
    private subject2 =new Subject<any>();
    currentIndex2=this.subject2.asObservable();

    constructor() {

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