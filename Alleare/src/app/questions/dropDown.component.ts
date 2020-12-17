import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Dropdown } from '../model/stories';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'dropDown',
  template: `
    <body>
    <mat-progress-spinner class="loading" *ngIf="isLoading" mode="indeterminate"></mat-progress-spinner>
    <div *ngIf="!isLoading">
      <div class="card2">
        <div class="ImageStory">{{ activequestion.frage }}</div>
        <div class="btn-group bundesliste">
          <button
            type="button"
            class="DropdownB dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            id="Bundestext"
          >
            <a>{{pickedstate}}</a>
          </button>

          <div class="dropdown-menu" id="drop">
            <!--Event fragt geklickte Id ab und setzt diese in die DB-->
            <a
              *ngFor="let land of activestate"
              id="{{ land }}"
              class="dropdown-item"
              (click)="setLand($event)"
            >
              {{ land }}
            </a>
          </div>
        </div>
      </div>

      <div class="col rowVZ form-group">
        <button id="Zbutton" class="btn" (click)="zurueck()">
          <img src="/assets/icons/icon_arrow_back.svg" width="50" height="50" />
        </button>
        <button
          id="Vorbutton"
          class="btn"
          [disabled]="index==0"
          routerLink="/evaluation"
          (click)="weiter()"
        >
          <img
            src="/assets/icons/icon_arrow_forward.svg"
            width="50"
            height="50"
          />
        </button>
      </div>
      <div class="d-flex Nova justify-content-end fixed-bottom">
        <img
          src="/assets/nova/nova_intro_rechts.png"
          width="100"
          height="100"
          id="NovaImage"
        />
      </div>
    </div>
    </body>
  `,
  styleUrls: ['./questions.component.css'],
})
export class DropDownComponent implements OnInit {
  public Frage: Dropdown[] = [];
  public Bundesland: Dropdown[] = [];
  public activequestion: Dropdown;
  public activestate = [];
  public isLoading = true;
  public pickedstate: string = "Bundesland"
  public index: number = 0;

  constructor(private dataservice: DataService, private router: Router, private questionService: QuestionService) {
  }

  setLand(event) {
    const weiterButton = (document.getElementById(
      'Vorbutton') as unknown) as HTMLInputElement;

    weiterButton.disabled = false;
    let title: string = event.target.id;
    this.pickedstate = title;
    firebase
      .firestore()
      .collection('Benutzer')
      .doc(localStorage.getItem('hans'))
      .collection('Fragenkatalog')
      .doc('Frage7')
      .set({
        antwort: title,
      });
  }
  private setInitialData() {
    this.activequestion = this.Frage[0];
  }

  public async ngOnInit() {
    await this.loadquestion();
    await this.loadstate();
    this.setInitialData();
    this.isLoading = false;//Dom wird geladen
  }
  public async loadquestion() {
    this.Frage = await this.questionService.getdropdownfrage();
  }
  public async loadstate() {
    this.Bundesland = await this.questionService.getdropdown();
    this.Bundesland.map((o, index) => {
      this.activestate[index] = o.bundesland
    })
  }
  weiter() {
    this.dataservice.addquestionprogress(1); //ProgressBar
    this.index++;
    if (this.index >= this.activequestion.frage.length) {
      this.router.navigate(["/evaluation"])
    }
  }
  zurueck() {
    this.dataservice.addquestionprogress(-1);//ProgressBar
    if (this.index == 0) {
      this.router.navigate(["/questions/options"])
    } else {
      this.index--;
    }
  }
}
