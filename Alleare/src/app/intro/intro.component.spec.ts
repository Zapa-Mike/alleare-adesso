import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Injector, NgModule } from '@angular/core';


import {MatDialogModule} from '@angular/material/dialog';
import{IntroComponent} from './intro.component'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

NgModule(
  {
    providers:[MatDialogModule,
    DataService, Router, FormBuilder]
  }
)


beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports:[
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      AngularFirestoreModule,
      
    ],
    declarations: [],
    providers:[DataService,Router, AngularFirestore,Router, FormBuilder]
  })
  .compileComponents();
});
describe('IntroComponent', () => {
  let component: IntroComponent;
  let fixture: ComponentFixture<IntroComponent>;

  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroComponent ],
      imports:[DataService, Router, FormBuilder]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

