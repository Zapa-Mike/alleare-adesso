import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';
import { animation, style } from '@angular/animations';
import { css } from 'jquery';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';

@Component({
  selector: 'app-novadialog',
  template: `
    <div id="dialog1" *ngIf="dialog">
      <img
        (click)="weiter()"
        id="NovaNormal1"
        class="Nova_Intro_Irrtuemer_Alltagssituationen1"
        src="assets/Intro/Dialog1_Nova_Animiert.gif"
      />
      <img id="Sprechblase1" src="assets/Sprechblase/speech bubble.png" />
      <p class="TextIrrtuemerAlltagssituation">
        Das war ein Teil von <br />
        vielen Irrtümer und <br />
        Alltagssituationen
      </p>
      <p class="TextKlickeMichAn">
        <b>Klicke mich</b>
      </p>
    </div>

    <div id="dialog2" *ngIf="dialog1">
      <img
        (click)="weiter2()"
        id="NovaNormal2"
        class="Nova_Intro_Irrtuemer_Alltagssituationen2"
        src="assets/Intro/Dialog2_Novaanimation.gif"
      />
      <img id="Sprechblase2" src="assets/Sprechblase/speech bubble.png" />
      <p class="TextNovaVorstellung">
        Ich bin hier und <br />
        werde dich vor <br />
        solchen Situationen <br />
        schützen und <br />
        aufklären
      </p>
    </div>

    <div id="dialog3" *ngIf="dialog2">
      <img
        (click)="weiter3()"
        id="NovaNormal3"
        class="Nova_Intro_Irrtuemer_Alltagssituationen3"
        src="assets/Intro/Dialog3_Nova_Animiert.gif"
      />
      <img id="Sprechblase3" src="assets/Sprechblase/speech bubble.png" />
      <p class="TextNovaberatung">
        Mit meiner Hilfe <br />
        und der App alleare <br />
        wirst du kostenlos <br />
        und jederzeit Beraten
      </p>
    </div>

    <div id="dialog4" *ngIf="dialog3">
      <img
        id="NovaNormal4"
        class="Nova_Intro_Irrtuemer_Alltagssituationen4"
        src="assets/Intro/Dialog4_Animiert_Nova.gif"
        routerLink="/home"
      />
      <img id="Sprechblase4" src="assets/Sprechblase/speech bubble.png" />
      <p class="TextZukunftVersicherungen">
        Damit du dich <br />
        in Zukunft mit <br />
        Versicherungen noch <br />
        besser auskennst
      </p>
      <div id="Knopfpositionierung" class="col justify-content-center">
        <button type="submit" class="btn rounded-pill" routerLink="/home">
          STARTEN
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./intro.component.css'],
})
export class novadialogComponent implements OnInit, DoCheck {
  dialog = true;
  dialog1 = false;
  dialog2 = false;
  dialog3 = false;
  dialog4 = false;

  constructor(private dataservice: DataService) {}

  ngDoCheck() {}

  weiter() {
    this.dialog = false;
    this.dialog1 = true;
  }
  weiter2() {
    this.dialog1 = false;
    this.dialog2 = true;
  }

  weiter3() {
    this.dialog2 = false;
    this.dialog3 = true;
  }

  ngOnInit() {}
}
