import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';


@Component({
  selector: 'options',
  template: `
    <div [formGroup]="form">
      <div class="card2">
        <div class="ImageStory">{{ anzeige }}</div>
        <div class="CheckboxAbfrage ">
          <div class="grid-containerRadioBAntwort">
            <div [hidden]="vierradiovisible1">
              <!--div lässt keinen platz zwischen-->
              <div class="grid-element form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    type="radio"
                    id="auswahlEins"
                    name="vierradio"
                    formControlName="vierradio"
                    value="{{ anzeigeAntwort1 }}"
                  />
                  <label class="form-check-label" for="auswahlEins">
                    {{ anzeigeAntwort1 }}
                  </label>
                </div>
              </div>
              <div class="grid-element form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    type="radio"
                    id="auswahlZwei"
                    name="vierradio"
                    formControlName="vierradio"
                    value="{{ anzeigeAntwort2 }}"
                  />
                  <label class="form-check-label" for="auswahlZwei">
                    {{ anzeigeAntwort2 }}
                  </label>
                </div>
              </div>
            </div>
            <!---->
            <div [hidden]="vierradiovisible2">
              <div class="grid-element form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    type="radio"
                    id="auswahlDrei"
                    name="vierradio"
                    formControlName="vierradio"
                    value="{{ anzeigeAntwort3 }}"
                  />
                  <label class="form-check-label" for="auswahlDrei">{{ anzeigeAntwort3 }} </label>
                </div>
              </div>

              <div class="grid-element form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    type="radio"
                    id="auswahlVier"
                    name="vierradio"
                    formControlName="vierradio"
                    value="{{ anzeigeAntwort4 }}"
                  />
                  <label class="form-check-label" for="auswahlVier">
                    {{ anzeigeAntwort4 }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div [hidden]="zweiBildervisible">
            <div class="grid-containerBilderAntwort">
              <div class="grid-element form-check-inline">
                <div class="form-check form-check-inline">
                  <label class="labelBilder">
                    <input
                      type="radio"
                      id="auswahlBildEins"
                      class="BildButtons"
                      name="zweiBild"
                      formControlName="zweiBild"
                      value="{{ label1 }}"
                    />
                    <img
                      class="BildVorRadio"
                      id="auswahlEins"
                      src="data:image/gif;base64,{{ zweibildAntwort1 }}"
                      width="70px"
                      height="50px"
                    />
                  </label>
                  <div [hidden]="zweiBilderLabelvisible">
                    <p>
                      <label class="form-check-label" for="auswahlBildEins" > {{ label1 }} </label>
                    </p>
                  </div>
                </div>
              </div>

              <div class="grid-element form-check-inline">
                <div class="form-check form-check-inline">
                  <label class="labelBilder" >
                    <input
                      type="radio"
                      id="auswahlBildZwei"
                      class="BildButtons"
                      name="zweiBild"
                      formControlName="zweiBild"
                      value="{{ label2 }}"
                    />
                    <img
                      class="BildVorRadio"
                      id="auswahlZwei"
                      src="data:image/gif;base64,{{ zweibildAntwort2 }}"
                      width="70px"
                      height="50px"
                    />
                  </label>
                  <div [hidden]="zweiBilderLabelvisible">
                    <p>
                      <label class="form-check-label" for="auswahlBildZwei"> {{ label2 }}</label>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col rowVZ">
        <button id="Vbutton" class="btn" (click)="weiter()">
          <img
            src="/assets/icons/icon_arrow_forward.svg"
            width="50"
            height="50"
          />
        </button>
        <button id="Zbutton" class="btn" (click)="zurueck()">
          <img src="/assets/icons/icon_arrow_back.svg" width="50" height="50" />
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
  `,
  styleUrls: ['./questions.component.css'],
})
export class OptionsComponent implements DoCheck, OnInit {
  form: FormGroup;
  dbget = firebase.firestore().collection('Fragenkatalog'); // Abgreifen der Fragen aus DB
  dbpush=firebase // pushen der Antworten in die DB
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Fragenkatalog');
  index: any = 0; // routet alle Seiten des Templates 
  anzeige: string; //Zeigt Frage in der Oberfläche an 
  fragenvierradio = []; // Speichert alle Fragen von Typ "vierradio"
  docidvierradio = []; // Speichert die IDs der Fragen von Typ "vierradio" --> antworten des Nutzers werden richtig abgespeichert 
  vierradiovisible1:boolean=false; // an und aus boolean für die oberen zwei Radios
  vierradiovisible2:boolean=false; // an und aus boolean für die unteren zwei Radios
  //Radiobuttonantworten
  antwort1 = []; 
  antwort2 = [];
  antwort3 = [];
  antwort4 = [];
  // Anzeige der Antwortmöglichkeiten audf der Oberfläche 
  anzeigeAntwort1: string;
  anzeigeAntwort2: string;
  anzeigeAntwort3: string;
  anzeigeAntwort4: string;
  // Bilder für die Bilderantworten 
  zweibilder1 = [];
  zweibilder2 = [];
  //Geben den codierten String des Bildes, in die zum decodierenden src 
  zweibildAntwort1:string;
  zweibildAntwort2:string;
  //Speicheren die Labels für die Bilderantworten ab
  zweibilderlabel1 =[];
  zweibilderlabel2 =[];
  //Geben Label aus dem Array in die Oberfläche
  label1 : string;
  label2: string; 
 // Schaltet die Bilder und Labels an und aus 
  zweiBildervisible:boolean=true;
  zweiBilderLabelvisible: boolean = true;
  fragenzweibilder = [];// Fragen aus der DB mit dem Typ "zweibilder"
  docidzweibilder = []; // Speichert die IDs der Fragen von Typ "zweibilder" --> antworten des Nutzers werden richtig abgespeichert 
 
  constructor(private dataservice: DataService) {
    this.form = new FormGroup({
      vierradio: new FormControl(),
      zweiBild: new FormControl(),
    });
    this.dbget //Abspeicherung aller "vierradio" Fragen und Antworten 
      .where('type', '==', 'vierradio')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.fragenvierradio.push(doc.data().frage);
          this.docidvierradio.push(doc.id);
          this.antwort1.push(doc.data().antwort1);
          this.antwort2.push(doc.data().antwort2);
          this.antwort3.push(doc.data().antwort3);
          this.antwort4.push(doc.data().antwort4);
        });
      });

    this.dbget //Abspeicherung aller "zweibilder" Fragen und Antworten 
      .where('type', '==', 'zweibilder')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.fragenzweibilder.push(doc.data().frage);
          this.docidzweibilder.push(doc.id);
          this.zweibilder1.push(doc.data().bild);
          this.zweibilder2.push(doc.data().bild2);
          this.zweibilderlabel1.push(doc.data().antwort1);
          this.zweibilderlabel2.push(doc.data().antwort2);
        });
      });
  }
  ngOnInit() {
    const weiterButton = (document.getElementById(
      'Vbutton'
    ) as unknown) as HTMLInputElement;
    weiterButton.disabled = true;
    this.dataservice.sendIndexrouting2(2);//damit die Temps einzelnd und nicht zusammen angezeigt werden 
    if(this.dataservice.getIndexTemp2()==null){
      console.log("anfang")
    }
    else{
      this.index=this.dataservice.getIndexTemp2()-1; // wird einen runtergesetzt, damit das Temp die richtige letzte Seite anzeigt 
      if(this.index<0){
        this.index=0;
      }
      console.log(this.index)
      console.log("zurueck")
      this.dataservice.sendIndexrouting1(30); // damit Temp 3 nicht dauerhaft aufgerufen wird
    }
  }

  ngDoCheck() {
     const weiterButton = (document.getElementById(
      'Vbutton'
    ) as unknown) as HTMLInputElement;
   

    if (this.index < this.fragenvierradio.length) {  // schaut ob die vierradiobuttons angezeigt werden sollen 
      this.anzeige = this.fragenvierradio[this.index]; // richtige Frage soll angezeigt werden 
      this.vierradiovisible1=this.vierradiovisible2 = false; // vierradiobuttons werden angezeit 
      this.zweiBilderLabelvisible,this.zweiBildervisible = true; // Bilder und labels werden nicht angezeigt 
      // Die Antworten auf der Oberfläche entsprechen der Antwortmöglichkeiten aus der DB 
      this.anzeigeAntwort1 = this.antwort1[this.index];
      this.anzeigeAntwort2 = this.antwort2[this.index];
      this.anzeigeAntwort3 = this.antwort3[this.index];
      this.anzeigeAntwort4 = this.antwort4[this.index];

      if ($('input[name=vierradio]:checked').length > 0)  // setzt alle gecheckten Radiobuttons zurück, wenn nächste Seite aufgerufen wird 
      {
       weiterButton.disabled = false;  
      }
    
    }
    // Schaut ob Bilderantworten angezeigt werden solle 
    if (this.index >= this.fragenvierradio.length && this.index < this.fragenzweibilder.length+this.fragenvierradio.length) { //Index der alle Seien zählt,muss größer sein als die Anzahl der vorherigen Fragen && Index der alle Seien zählt, muss kleiner sein als alle aktuell aufgerufenen Fragen und alle vorherige Fragen
      this.anzeige = this. fragenzweibilder[this.index - this.fragenvierradio.length]; // richtige Frage soll angezeigt werden 
      this.zweiBilderLabelvisible=  this.zweiBildervisible = false; // Bilder und Labels sollen angezeigt werden 
      this.vierradiovisible1=this.vierradiovisible2  = true;// Radiobuttons werden ausgeschaltet 
      // Antwortmöglichkeiten werden in die Oberfläche gebracht 
      this.zweibildAntwort1 = this. zweibilder1[this.index - this.fragenvierradio.length]; 
      this.zweibildAntwort2 = this. zweibilder2[this.index - this.fragenvierradio.length];
      // Label (Text unter den Bildern) wird in der Oberfläche angezeigt 
      this.label1 = this. zweibilderlabel1[this.index - this.fragenvierradio.length];
      this.label2 = this. zweibilderlabel2[this.index - this.fragenvierradio.length];
      
      if ($('input[name=zweiBild]:checked').length > 0)  // setzt alle gecheckten Radiobuttons zurück, wenn nächste Seite aufgerufen wird 
      {
       weiterButton.disabled = false;  
      }
    }
   
    
  }
  weiter(){
    const weiterButton = (document.getElementById(
      'Vbutton'
    ) as unknown) as HTMLInputElement;
    weiterButton.disabled = true;
    if(this.index<this.fragenzweibilder.length+this.fragenvierradio.length){ // zählt bis zu der maximalen Anzahl der Seiten hoch 
    this.index++; // index wird hochgesetzt 
    this.dataservice.addindexTemp2(this.index); // Index wird Dataservice übergeben, damit später zurueck geroutet werden kann
    }
    if(this.index>=this.fragenzweibilder.length+this.fragenvierradio.length && this.index!=0){
      this.dataservice.sendIndexrouting1(3);//weiterrotten zu Temp3 wird Dataservice übergeben 
    }
    //greift die Radiobuttons aus der Oberfläche ab
    
    if ($('input[name=vierradio]:checked').length > 0)  // setzt alle gecheckten Radiobuttons zurück, wenn nächste Seite aufgerufen wird 
      {
               $('#auswahlEins').prop('checked', false);
               $('#auswahlZwei').prop('checked', false);
               $('#auswahlDrei').prop('checked', false);
               $('#auswahlVier').prop('checked', false)
      }
      if ($('input[name=zweiBild]:checked').length > 0)  // setzt alle gecheckten Radiobuttons zurück, wenn nächste Seite aufgerufen wird 
      {
        $('#auswahlBildEins').prop('checked', false);
        $('#auswahlBildZwei').prop('checked', false);
      }
   if (this.vierradiovisible1 == false && this.vierradiovisible2 == false){ //Speichert gecheckten Radiobutton Wert von Typ "vierradio"
    this.dbpush.doc(this. docidvierradio[this.index-1]).set({
      antwort: this.form.value.vierradio
   });
  }

   if(this.zweiBilderLabelvisible== false && this.zweiBildervisible == false){ // Speichert Bildantworten von Typ "zweibilder" 
 this.dbpush.doc(this. docidzweibilder[this.index-this.fragenvierradio.length-1]).set({
  antwort: this.form.value.zweiBild,
});
}
      }
      zurueck(){
        if(this.index>=0){
          this.index--; // setzt Index eins runter 
          
        }
        if(this.index<0){
          this.dataservice.sendIndexrouting1(1); // uebergibt dem Dataservice die Anweisung Temp1 zu öffnen
        }
        this.dataservice.addindexTemp2(this.index);// uebergibt dem Dataservice aktuellen Index
      }
      }  
