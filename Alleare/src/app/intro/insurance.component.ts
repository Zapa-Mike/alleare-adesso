import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-insurance',
  template: `

  <!--Screen Intro Irrtümer Anfang-->
<div id="HaftpflichtEinblenden">
 <img class="HaftpflichtBild" src="/assets/Bilder_Irrtuemer_Altagssituationen/Haftpflicht.png"/>
 <div class="TextHaftpflicht">
    <p><b>Haftpflicht zahlt den <br>Neupreis</b></p>
 </div>
</div>

<div id="HausratEinblenden">
 <img class="HausratBild" visibility:visible src="/assets/Bilder_Irrtuemer_Altagssituationen/Hausrat.png"/>  
  <div class="TextHausrat">
   <p><b>Hausrat zahlt immer bei <br>Raub</b></p>
  </div>
</div>
<!--Screen Intro Irrtümer Ende-->




 <!--Screen Intro Altagssituation Autounfall Anfang-->
<div id="PersonenbefoerderungEinblenden">
  <img class="PersonenbefoerderungBild" src="/assets/Bilder_Irrtuemer_Altagssituationen/header-personenbefoerderung.png"/>
   <div class="TextPersonenbefoerderung">
    <p><b>Unfall mit dem Auto <br>meines Freundes</b></p>
   </div>
</div>
 

<div id="AutoschadenEinblenden">
  <img class="AutoschadenBild" src="/assets/Bilder_Irrtuemer_Altagssituationen/Autoschaden.png"/>
   <div class="TextAutoschaden">
    <p><b>Wer trägt die Kosten?</b></p>
  </div>
</div>
   <!--Screen Intro Altagssituation Autounfall Ende-->




  <!-- Screen Intro Altagssituation Private Unfallversicherung Anfang-->
<div id="PrivateUnfallversicherungEinblenden">
    <img class="PrivateUnfallversicherungBild" src="/assets/Bilder_Irrtuemer_Altagssituationen/Private_Unfallversicherung.png"/>
     <div class="TextPrivateUnfallversicherung">
        <p><b>Unfall im eigenen Haus</b></p>
    </div>
</div>

<div id="HaushaltsunfallEinblenden">
    <img class="HaushaltsunfallBild" src="/assets/Bilder_Irrtuemer_Altagssituationen/haushaltsunfall.png"/>
    <div class="TextHaushaltsunfall">
        <p><b>Wer zahlt die <br> Behandlungskosten?</b></p>
    </div>
</div>
  <!-- Screen Intro Altagssituation Private Unfallversicherung Ende-->





  `,
  styleUrls: ['./intro.component.css'],
})
export class insuranceComponent {s
  /*Bildanimation Hausrat Anfang*/
  HausratObjektAusblenden() {
    const HausratEinblenden = (document.getElementById('HausratEinblenden') as unknown) as HTMLInputElement;

    setTimeout(function(){
      HausratEinblenden.style.visibility="visible";
    },2000);
  }
   /*Bildanimation Hausrat Ende*/

   
  ngOnInit(){
    this.HausratObjektAusblenden();         /*Initialisiere Hidden */
    this.AutoschadenObjektAusblenden();     /*Initialisiere Hidden */
    this.HaushaltsunfallObjektAusblenden(); /*Initialisiere Hidden */
  }


  /*Bildanimation Autoschaden Anfang*/
  AutoschadenObjektAusblenden() {
    const AutoschadenEinblenden = (document.getElementById('AutoschadenEinblenden') as unknown) as HTMLInputElement;

    setTimeout(function(){
      AutoschadenEinblenden.style.visibility="visible";
    },2000);
  }
  /*Bildanimation Autoschaden Ende*/


  /*Bildanimation Hauhaltsunfall Anfang*/
  HaushaltsunfallObjektAusblenden() {
    const HaushaltsunfallEinblenden = (document.getElementById('HaushaltsunfallEinblenden') as unknown) as HTMLInputElement;

    setTimeout(function(){
      HaushaltsunfallEinblenden.style.visibility="visible";
    },2000);
  }
  /*Bildanimation Hauhaltsunfall Ende*/
}

