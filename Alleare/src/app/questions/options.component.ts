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
      <div class="card">
        <div class="ImageStory">{{ anzeige }}</div>
          <div class="CheckboxAbfrage " >
            <div class="grid-containerRadioBAntwort">
              <div class="form-check form-check-inline">
                <div [hidden]="vierradiovisible1"> 
                  <div class="grid-element form-check-inline">
                    <input
                     type="radio"
                     id="auswahlEins"
                     name="vierradio"
                      formControlName="vierradio"
                      value="{{anzeigeAntwort1}}"
                    />
                    <label class="form-check-label"> {{ anzeigeAntwort1 }} </label>
                   </div>
                  <div class="form-check form-check-inline">
                    <div class="grid-element form-check-inline">
                      <input
                       type="radio"
                       id="auswahlZwei"
                       name="vierradio"
                      formControlName="vierradio"
                       value="{{anzeigeAntwort2}}"
                      />
                     <label class="form-check-label">
                       {{ anzeigeAntwort2 }}
                      </label>
                    </div>
                  </div>
                </div>
                <div [hidden]="zweiBildervisible">
                  <div class="grid-containerBilderAntwort">
                    <div class="form-check form-check-inline">
                      <label>
                      <input
                       type="radio" id="auswahlBildEins" class="BildButtons" name="zweiBild" formControlName="zweiBild" value="{{label1}}">
                        <img
                          id="auswahlEins"
                          src="data:image/gif;base64,{{zweibildAntwort1 }}"
                          width="70px"
                          height="50px"
                        />
</label>
                        <div [hidden]="zweiBilderLabelvisible">
                          <p><label class="form-check-label"> {{label1}} </label></p>
                        </div>
                     
                    </div>
                    <div class="form-check form-check-inline">
                      <label>
                      <input
                       type="radio" id="auswahlBildZwei" class="BildButtons" name="zweiBild" formControlName="zweiBild" value="{{label2}}">
                        <img
                          id="auswahlZwei"
                          src="data:image/gif;base64,{{ zweibildAntwort2 }}"
                          width="70px"
                          height="50px"
                        />
</label>
                        <div [hidden]="zweiBilderLabelvisible">
                          <p><label class="form-check-label"> {{label2}}</label></p>
                        </div>
                     
                    </div>
                  </div>
                </div>
                <div [hidden]="vierradiovisible2">
                  <div class="form-check form-check-inline">
                    <div class="grid-element form-check-inline">
                      <input
                        type="radio"
                        id="auswahlDrei"
                        name="vierradio"
                        formControlName="vierradio"
                        value="{{anzeigeAntwort3}}"
                      />
                      <label class="form-check-label">{{ anzeigeAntwort3 }} </label>
                    </div>
                  </div>
                  <div class="form-check form-check-inline">
                    <div class="grid-element form-check-inline">
                      <input
                        type="radio"
                        id="auswahlVier"
                        name="vierradio"
                        formControlName="vierradio"
                        value="{{anzeigeAntwort4}}"
                      />
                      <label class="form-check-label">
                        {{ anzeigeAntwort4 }}
                      </label>
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
      </div>
   
  `,
  styleUrls: ['./questions.component.css'],
})
export class OptionsComponent implements DoCheck {
  form: FormGroup;
  dbget = firebase.firestore().collection('Fragenkatalog');
  dbpush=firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Fragenkatalog');
  index: number = 0;
  anzeige: string;
  fragenliste = [];
  indexvierradio = [];
  fragenvierradio = [];
  docidvierradio = [];
  vierradiovisible1:boolean=false;
  vierradiovisible2:boolean=false;
  antwort1 = [];
  antwort2 = [];
  antwort3 = [];
  antwort4 = [];
  anzeigeAntwort1: string;
  anzeigeAntwort2: string;
  anzeigeAntwort3: string;
  anzeigeAntwort4: string;
  zweibilder1 = [];
  zweibilder2 = [];
  zweibildAntwort1:string;
  zweibildAntwort2:string;
  zweibilderlabel1 =[];
  zweibilderlabel2 =[];
  label1 : string;
  label2: string; 
  zweiBildervisible:boolean=true;
  zweiBilderLabelvisible: boolean = true;
  fragenzweibilder = [];
  docidzweibilder = [];
  constructor(private dataservice: DataService) {
    this.form = new FormGroup({
      vierradio: new FormControl(),
      zweiBild: new FormControl(),
    });
    this.dbget
      .where('type', '==', 'vierradio')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.fragenvierradio.push(doc.data()._);
          this.docidvierradio.push(doc.id);
          this.antwort1.push(doc.data().antwort1);
          this.antwort2.push(doc.data().antwort2);
          this.antwort3.push(doc.data().antwort3);
          this.antwort4.push(doc.data().antwort4);
        });
      });
    console.log(this.fragenvierradio);

    this.dbget
      .where('type', '==', 'zweibilder')
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.fragenzweibilder.push(doc.data()._);
          this.docidzweibilder.push(doc.id);
          this.zweibilder1.push(doc.data().bild);
          this.zweibilder2.push(doc.data().bild2);
          this.zweibilderlabel1.push(doc.data().antwort1);
          this.zweibilderlabel2.push(doc.data().antwort2);
        });
      });

  }
 
  
  ngDoCheck() {
    if (this.index < this.fragenvierradio.length) {
      this.anzeige = this.fragenvierradio[this.index];
      this.vierradiovisible1=this.vierradiovisible2 = false;
      this.zweiBilderLabelvisible,this.zweiBildervisible = true;
      this.anzeigeAntwort1 = this.antwort1[this.index];
      this.anzeigeAntwort2 = this.antwort2[this.index];
      this.anzeigeAntwort3 = this.antwort3[this.index];
      this.anzeigeAntwort4 = this.antwort4[this.index];
     
    }
    if (this.index >= this.fragenvierradio.length && this.index < this.fragenzweibilder.length+this.fragenvierradio.length) { 
      this.anzeige = this. fragenzweibilder[this.index - this.fragenvierradio.length];
      this.zweiBilderLabelvisible=  this.zweiBildervisible = false;
      this.vierradiovisible1=this.vierradiovisible2  = true;
      this.zweibildAntwort1 = this. zweibilder1[this.index - this.fragenvierradio.length];
      this.zweibildAntwort2 = this. zweibilder2[this.index - this.fragenvierradio.length];
      this.label1 = this. zweibilderlabel1[this.index - this.fragenvierradio.length];
      this.label2 = this. zweibilderlabel2[this.index - this.fragenvierradio.length];
    }
    if(this.index==this.fragenzweibilder.length+this.fragenvierradio.length && this.index!=0){
      this.dataservice.sendIndexrouting1(3);
    }
  }
  weiter(){
    this.index++;
    const radio1 = (document.getElementById(
      'auswahlEins'
    ) as unknown) as HTMLInputElement;
    const radio2 = (document.getElementById(
      'auswahlZwei'
    ) as unknown) as HTMLInputElement;
    const radio3 = (document.getElementById(
      'auswahlDrei'
    ) as unknown) as HTMLInputElement;
    const radio4 = (document.getElementById(
      'auswahlVier'
    ) as unknown) as HTMLInputElement;
    if (radio1.checked || radio2.checked || radio3.checked || radio4.checked) 
      {
               $('#auswahlEins').prop('checked', false);
               $('#auswahlZwei').prop('checked', false);
               $('#auswahlDrei').prop('checked', false);
               $('#auswahlVier').prop('checked', false);
      }
   if (this.vierradiovisible1 == false && this.vierradiovisible2 == false){
    console.log ("jaaaaa")
    this.dbpush.doc(this. docidvierradio[this.index-1]).set({
      _: this.form.value.vierradio
   });
  }

   if(this.zweiBilderLabelvisible== false && this.zweiBildervisible == false){
 console.log ("tadaaaaaaaaa")
 console.log (this.label1)
 console.log(this.form.value.zweiBild) 
 console.log(this.docidzweibilder)
 this.dbpush.doc(this. docidzweibilder[this.index-this.fragenvierradio.length-1]).set({
  _: this.form.value.zweiBild,
});
}


/*if(this.vierradiovisible2== false && this.zweiBildervisible == false){
  console.log ("huraaaaaa")
  this.dbpush.doc(this. docidzweibilder[this.index-1]).set({
   _: this.form.value.zweiBild
  });
}*/

  

 
       
   
        
      }
      zurueck(){
        this.index--;
      }
      }  

     

  

