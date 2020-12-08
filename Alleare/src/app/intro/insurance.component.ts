import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-insurance',
  template: `
    <body>
      <!--Screen Intro Irrtümer Anfang-->
      <div [hidden]="eins">
        <div id="HaftpflichtEinblenden">
          <img
            class="HaftpflichtBild"
            src="/assets/Bilder_Irrtuemer_Altagssituationen/Haftpflicht.png"
          />
          <div class="TextHaftpflicht">
            <p>
              <b>Haftpflicht zahlt den <br />Neupreis</b>
            </p>
          </div>
        </div>

        <div id="HausratEinblenden">
          <img
            class="HausratBild"
            src="/assets/Bilder_Irrtuemer_Altagssituationen/Hausrat.png"
          />
          <div class="TextHausrat">
            <p>
              <b>Hausrat zahlt immer bei <br />Raub</b>
            </p>
          </div>
        </div>
      </div>
      <!--Screen Intro Irrtümer Ende-->
      <div [hidden]="zwei">
        <!--Screen Intro Altagssituation Autounfall Anfang-->
        <div id="PersonenbefoerderungEinblenden">
          <img
            class="PersonenbefoerderungBild"
            src="/assets/Bilder_Irrtuemer_Altagssituationen/header-personenbefoerderung.png"
          />
          <div class="TextPersonenbefoerderung">
            <p>
              <b>Unfall mit dem Auto <br />meines Freundes</b>
            </p>
          </div>
        </div>

        <div id="AutoschadenEinblenden">
          <img
            class="AutoschadenBild"
            src="/assets/Bilder_Irrtuemer_Altagssituationen/Autoschaden.png"
          />
          <div class="TextAutoschaden">
            <p><b>Wer trägt die Kosten?</b></p>
          </div>
        </div>
      </div>
      <!--Screen Intro Altagssituation Autounfall Ende-->
      <div [hidden]="drei">
        <!-- Screen Intro Altagssituation Private Unfallversicherung Anfang-->
        <div id="PrivateUnfallversicherungEinblenden">
          <img
            class="PrivateUnfallversicherungBild"
            src="/assets/Bilder_Irrtuemer_Altagssituationen/Private_Unfallversicherung.png"
          />
          <div class="TextPrivateUnfallversicherung">
            <p><b>Unfall im eigenen Haus</b></p>
          </div>
        </div>

        <div id="HaushaltsunfallEinblenden">
          <img
            class="HaushaltsunfallBild"
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
    </body>
    <!-- Screen Intro Altagssituation Private Unfallversicherung Ende-->
  `,
  styleUrls: ['./intro.component.css'],
})
export class insuranceComponent implements OnInit {
  drei: boolean = true;
  eins: boolean = false;
  zwei: boolean = true;

  julia: boolean = true;
  julia1: boolean = true;
  julia2: boolean = true;

  Anzeige = [
    'HausratEinblenden',
    'AutoschadenEinblenden',
    'HaushaltsunfallEinblenden',
  ];

  i: number = 1;
  constructor(private dataservice: DataService) {}
  ngOnInit() {
    this.HausratObjektAusblenden();
    setTimeout(() => {
      this.eins = true;
      this.zwei = false;
      this.AutoschadenObjektAusblenden();
    }, 4000);
    setTimeout(() => {
      this.zwei = true;
      this.drei = false;
      this.HaushaltsunfallObjektAusblenden();
    }, 8000);
    setTimeout(() => {
      this.sendIndexdialog();
    }, 12000);

    /*Initialisiere Hidden */
    /*Initialisiere Hidden */
    /*Initialisiere Hidden */
  }

  /*Bildanimation Hausrat Anfang*/
  HausratObjektAusblenden() {
    const HausratEinblenden = (document.getElementById(
      'HausratEinblenden'
    ) as unknown) as HTMLInputElement;

    setTimeout(function () {
      HausratEinblenden.style.visibility = 'visible';
    }, 2000);
  }
  /*Bildanimation Hausrat Ende*/

  /*Bildanimation Autoschaden Anfang*/
  AutoschadenObjektAusblenden() {
    const AutoschadenEinblenden = (document.getElementById(
      'AutoschadenEinblenden'
    ) as unknown) as HTMLInputElement;

    setTimeout(function () {
      AutoschadenEinblenden.style.visibility = 'visible';
    }, 2000);
  }
  /*Bildanimation Autoschaden Ende*/

  /*Bildanimation Hauhaltsunfall Anfang*/
  HaushaltsunfallObjektAusblenden() {
    const HaushaltsunfallEinblenden = (document.getElementById(
      'HaushaltsunfallEinblenden'
    ) as unknown) as HTMLInputElement;

    setTimeout(function () {
      HaushaltsunfallEinblenden.style.visibility = 'visible';
    }, 2000);
  }

  sendIndexdialog() {
    this.dataservice.sendIndexdialog(this.i);
  }
}
