import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsComponent } from './questions.component';
import { DataService } from '.././services/data.service';
import * as firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { StoriesComponent } from './stories.component';
describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
      ],
      declarations: [QuestionsComponent],
      providers: [DataService, AngularFirestore],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(QuestionsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Willkommen im Fragenkatalog'
    );
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(QuestionsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
