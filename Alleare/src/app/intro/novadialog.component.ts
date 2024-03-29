import { Component } from '@angular/core';
@Component({
  selector: 'app-novadialog',
  template: `
    <head>
      <!-- Required meta tags -->
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <!-- Bootstrap CSS -->
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
        crossorigin="anonymous"
      />
    </head>

    <div id="dialog1" *ngIf="dialog">
      <img
        (click)="showSecondDialog()"
        id="NovaNormal1"
        class="Nova_Intro_Irrtuemer_Alltagssituationen1"
        src="assets/Intro/Dialog1_Animert.gif"
      />
      <img
        class="Sprechblase1 img-fluid"
        src="assets/Sprechblase/speech bubble.png"
      />
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
        (click)="showThirdDialog()"
        id="NovaNormal2"
        class="Nova_Intro_Irrtuemer_Alltagssituationen2"
        src="assets/Intro/Dialog2_Animiert.gif"
      />
      <img
        class="Sprechblase2 img-fluid"
        src="assets/Sprechblase/speech bubble.png"
      />
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
        (click)="showFourthDialog()"
        id="NovaNormal3"
        class="Nova_Intro_Irrtuemer_Alltagssituationen3"
        src="assets/Intro/Dialog3_Animiert.gif"
      />
      <img
        class="Sprechblase2 img-fluid"
        src="assets/Sprechblase/speech bubble.png"
      />
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
        src="assets/Intro/Dialog4_Animiert.gif"
        routerLink="/home"
      />
      <img
        class="Sprechblase2 img-fluid"
        src="assets/Sprechblase/speech bubble.png"
      />
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
export class NovadialogComponent {
  dialog = true; // first animation
  dialog1 = false; // second animation
  dialog2 = false; // third animation
  dialog3 = false; // fourth animation

  constructor() {}

  showSecondDialog() {
    this.dialog = false; // blendet ersten Dialog aus
    this.dialog1 = true; // blendet zweiten Dialog ein
  }
  showThirdDialog() {
    this.dialog1 = false; // blendet zweiten Dialog aus
    this.dialog2 = true; // blendet dritten Dialog ein
  }

  showFourthDialog() {
    this.dialog2 = false; // blendet dritten Dialog aus
    this.dialog3 = true; // blende vierten Dialog ein
  }
}
