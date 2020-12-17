import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance',
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

    <body>
      <!--Screen Intro Irrtümer Anfang-->
      <div [hidden]="firstPictures">
        <!--Erste Bilderanzeige-->
        <div class="dialog1 container">
          <div class="row">
            <div class="col col-12">
              <div id="HaftpflichtEinblenden">
                <img
                  class="HaftpflichtBild img-fluid"
                  src="/assets/Bilder_Irrtuemer_Altagssituationen/Haftpflicht.png"
                />
                <div class="TextHaftpflicht">
                  <p>
                    <b>Haftpflicht zahlt den <br />Neupreis</b>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col col-10">
              <div id="HausratEinblenden">
                <img
                  class="HausratBild img-fluid"
                  src="/assets/Bilder_Irrtuemer_Altagssituationen/Hausrat.png"
                />
                <div class="TextHausrat">
                  <p>
                    <b>Hausrat zahlt immer bei <br />Raub</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Screen Intro Irrtümer Ende-->

      <div [hidden]="secondPictures">
        <!--Zweite Bilderanzeige-->
        <!--Screen Intro Altagssituation Autounfall Anfang-->

        <div class="dialog2 container">
          <div class="row">
            <div class="col col-12">
              <div id="PersonenbefoerderungEinblenden">
                <img
                  class="PersonenbefoerderungBild img-fluid"
                  src="/assets/Bilder_Irrtuemer_Altagssituationen/header-personenbefoerderung.png"
                />
                <div class="TextPersonenbefoerderung">
                  <p>
                    <b>Unfall mit dem Auto <br />meines Freundes</b>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col col-10">
              <div id="AutoschadenEinblenden">
                <img
                  class="AutoschadenBild img-fluid"
                  src="/assets/Bilder_Irrtuemer_Altagssituationen/Autoschaden.png"
                />
                <div class="TextAutoschaden">
                  <p><b>Wer trägt die Kosten?</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Screen Intro Altagssituation Autounfall Ende-->
      <div [hidden]="thirdPictures">
        <!--Dritte Bilderanzeige-->
        <!-- Screen Intro Altagssituation Private Unfallversicherung Anfang-->

        <div class="dialog3 Container">
          <div class="row">
            <div class="col col-12">
              <div id="PrivateUnfallversicherungEinblenden">
                <img
                  class="PrivateUnfallversicherungBild img-fluid"
                  src="/assets/Bilder_Irrtuemer_Altagssituationen/Private_Unfallversicherung.png"
                />
                <div class="TextPrivateUnfallversicherung">
                  <p><b>Unfall im eigenen Haus</b></p>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col col-10">
              <div id="HaushaltsunfallEinblenden">
                <img
                  class="HaushaltsunfallBild img-fluid"
                  src="/assets/Bilder_Irrtuemer_Altagssituationen/haushaltsunfall.png"
                />
                <div class="TextHaushaltsunfall">
                  <p>
                    <b
                      >Wer zahlt die <br />
                      Behandlungskosten?</b
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    <!-- Screen Intro Altagssituation Private Unfallversicherung Ende-->
  `,
  styleUrls: ['./intro.component.css'],
})
export class InsuranceComponent implements OnInit {
  public thirdPictures: boolean = true; // ngIf für die Bilder fünf und sechs
  public firstPictures: boolean = false; // ngIf für die ersten zwei Bilder
  public secondPictures: boolean = true; // ngIf für die Bilder drei und vier

  constructor(public router: Router) {}

  public ngOnInit() {
    this.showHausratObjekt(); // ruft die Funktion, welche die Bilder anzeigt auf
    setTimeout(() => {
      this.firstPictures = true; // blendet die ersten Bilder aus
      this.secondPictures = false; // blendet Seite mit Bild drei und vier ein
      this.showAutoschadenObjekt(); //ruft Funktion für die Animation auf
    }, 4000);
    setTimeout(() => {
      this.secondPictures = true; // blendet Bild drei und vier aus
      this.thirdPictures = false; // blendet Seite mit Bild fünf und sechs ein
      this.showHaushaltsunfallObjekt(); //ruft Funktion für die Animation auf
    }, 8000);
  }

  /*Bildanimation Hausrat Anfang*/
  private showHausratObjekt() {
    const showHausratImage = (document.getElementById(
      'HausratEinblenden'
    ) as unknown) as HTMLInputElement;

    setTimeout(function () {
      showHausratImage.style.visibility = 'visible'; // zeigt erst nach zwei Secunden zweites Bild der Seite an
    }, 2000);
  }
  /*Bildanimation Hausrat Ende*/

  /*Bildanimation Autoschaden Anfang*/
  private showAutoschadenObjekt() {
    const showAutoschadenImage = (document.getElementById(
      'AutoschadenEinblenden'
    ) as unknown) as HTMLInputElement;

    setTimeout(function () {
      showAutoschadenImage.style.visibility = 'visible'; // zeigt erst nach zwei Secunden zweites Bild der Seite an
    }, 2000);
  }
  /*Bildanimation Autoschaden Ende*/

  /*Bildanimation Hauhaltsunfall Anfang*/
  private showHaushaltsunfallObjekt() {
    const showHaushaltsunfallImage = (document.getElementById(
      'HaushaltsunfallEinblenden'
    ) as unknown) as HTMLInputElement;

    setTimeout(() => {
      showHaushaltsunfallImage.style.visibility = 'visible'; // zeigt erst nach zwei Secunden zweites Bild der Seite an
    }, 2000);
    setTimeout(() => {
      this.showNovaDialog(); // zwei Sekunden nach dem zweiten Bild wird zu der novadialog.component.ts geroutet
    }, 4000);
  }
  private showNovaDialog() {
    this.router.navigate(['intro/novadialog']); // rout zu  novadialog.component.ts
  }
}
