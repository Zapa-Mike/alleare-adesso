import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';
import { style } from '@angular/animations';

@Component({
  selector: 'app-novadialog',
  template: `
    <div id="dialog1">
      <img
        id="NovaNormal1"
        class="Nova_Intro_Irrtuemer_Alltagssituationen1"
        src="{{ NovaNormal1 }}"
        routerLink='/home'
      />
      <img id="Sprechblase1" src="assets/Sprechblase/speech bubble.png" />
      <p class="TextIrrtuemerAlltagssituation">
        Das war ein Teil von <br />
        vielen Irrtümer und <br />
        Alltagssituationen
      </p>
    </div>

    <div id="dialog2">
      <img
        id="NovaNormal2"
        class="Nova_Intro_Irrtuemer_Alltagssituationen2"
        src="{{ NovaNormal2 }}"
      />
      <img id="Sprechblase2" src="assets/Sprechblase/speech bubble.png" />
      <p class="TextNovaVorstellung">
        Ich bin Nova <br />
        und werde dich <br />
        schützen und <br />
        aufklären
      </p>
    </div>

    }

    <div id="dialog3">
      <img
        id="NovaNormal3"
        class="Nova_Intro_Irrtuemer_Alltagssituationen3"
        src="{{ NovaNormal3 }}"
      />
      <img id="Sprechblase3" src="assets/Sprechblase/speech bubble.png" />
      <p class="TextNovaberatung">
        Mit meiner Hilfe <br />
        und der App alleare <br />
        wirst du kostenlos <br />
        und jederzeit Beraten
      </p>
    </div>

    <div id="dialog4">
      <img
        id="NovaNormal4"
        class="Nova_Intro_Irrtuemer_Alltagssituationen4"
        src="{{ NovaNormal4 }}"
      />
      <img id="Sprechblase4" src="assets/Sprechblase/speech bubble.png" />
      <p class="TextZukunftVersicherungen">
        Damit du dich <br />
        in Zukunft mit <br />
        Versicherungen noch <br />
        besser auskennst
      </p>
    </div>
  `,
  styleUrls: ['./intro.component.css'],
})
export class novadialogComponent implements OnInit {
  constructor(private dataservice: DataService) {}
  NovaNormal1 = '/assets/nova/nova_intro_rechts.png';
  NovaNormal2 = '/assets/nova/nova_intro_rechts.png';
  NovaNormal3 = '/assets/nova/nova_intro_rechts.png';
  NovaNormal4 = '/assets/nova/nova_intro_rechts.png';
  NovaZwinker = '/assets/nova/Nova_Zwinkern.png';
  NovaSuess = '/assets/nova/Nova_Süss.png';

  ngOnInit() {
    const Nova1 = (document.getElementById(
      'NovaNormal1'
    ) as unknown) as HTMLInputElement;
    const Nova2 = (document.getElementById(
      'NovaNormal2'
    ) as unknown) as HTMLInputElement;
    const Nova3 = (document.getElementById(
      'NovaNormal3'
    ) as unknown) as HTMLInputElement;
    const Nova4 = (document.getElementById(
      'NovaNormal4'
    ) as unknown) as HTMLInputElement;

    setTimeout(function () {
      Nova1.src = '/assets/nova/Nova_Zwinkern.png';
    }, 1000);

    setTimeout(function () {
      Nova1.src = '/assets/nova/nova_intro_rechts.png';
    }, 2000);

    setTimeout(function () {
      Nova2.src = '/assets/nova/Nova_Süss.png';
    }, 1000);

    setTimeout(function () {
      Nova2.src = '/assets/nova/nova_intro_rechts.png';
    }, 2000);

    setTimeout(function () {
      Nova3.src = '/assets/nova/Nova_Zwinkern.png';
    }, 1000);

    setTimeout(function () {
      Nova3.src = '/assets/nova/nova_intro_rechts.png';
    }, 2000);
  }
}
