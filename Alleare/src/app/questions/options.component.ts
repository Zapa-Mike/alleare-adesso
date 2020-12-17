import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { VierRadio, ZweiBilder } from '../model/stories';

@Component({
  selector: 'options',
  template: `
  <mat-progress-spinner class="loading" *ngIf="isLoading" mode="indeterminate"></mat-progress-spinner>
    <div *ngIf="!isLoading" [formGroup]="form">
      <div class="card2">
        <div *ngIf="vierradiovisible" class="ImageStory">{{activevierradio.frage}}</div>
        <div *ngIf="!vierradiovisible" class="ImageStory">{{activezweibilder.frage}}</div>
        <div class="CheckboxAbfrage ">
          <div *ngIf="vierradiovisible" class="grid-containerRadioBAntwort">
            <div class="Spalten">
              <!--div lässt keinen platz zwischen-->
              <div class="grid-element form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    type="radio"
                    id="auswahlEins"
                    name="vierradio"
                    [formControl]="form.controls.antwort"
                    value="{{activevierradio.antwort1}}"
                  />
                  <label class="form-check-label" for="auswahlEins">
                    {{ activevierradio.antwort1 }}
                  </label>
                </div>
              </div>
              <div class="grid-element form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    type="radio"
                    id="auswahlZwei"
                    name="vierradio"
                    [formControl]="form.controls.antwort"
                    value="{{activevierradio.antwort2}}"
                  />
                  <label class="form-check-label" for="auswahlZwei">
                    {{ activevierradio.antwort2 }}
                  </label>
                </div>
              </div>
            </div>
            <!---->
            <div class="Spalten">
              <div class="grid-element form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    type="radio"
                    id="auswahlDrei"
                    name="vierradio"
                    [formControl]="form.controls.antwort"
                    value="{{activevierradio.antwort3}}"
                  />
                  <label class="form-check-label" for="auswahlDrei"
                    >{{ activevierradio.antwort3 }}
                  </label>
                </div>
              </div>

              <div class="grid-element form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    type="radio"
                    id="auswahlVier"
                    name="vierradio"
                    [formControl]="form.controls.antwort"
                    value="{{activevierradio.antwort4}}"
                  />
                  <label class="form-check-label" for="auswahlVier">
                    {{ activevierradio.antwort4 }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!--AB HIER BEGINNT BILDERTEMPLATE-->

          <div *ngIf="zweiBildervisible">
            <div class="grid-containerBilderAntwort">
              <div class="grid-element form-check-inline">
                <div class="form-check form-check-inline">
                  <label class="labelBilder">
                    <input
                      type="radio"
                      id="auswahlBildEins"
                      class="BildButtons"
                      name="zweiBild"
                      [formControl]="form.controls.antwort"
                      value="{{ activezweibilder.label1 }}"
                    />
                    <img
                      class="BildVorRadio"
                      id="auswahlEins"
                      src="data:image/gif;base64,{{ activezweibilder.bild1 }}"
                      width="70px"
                      height="50px"
                    />
                  </label>
                  <div>
                    <p>
                      <label class="form-check-label" for="auswahlBildEins">
                        {{ activezweibilder.label1 }}
                      </label>
                    </p>
                  </div>
                </div>
              </div>

              <div class="grid-element form-check-inline">
                <div class="form-check form-check-inline">
                  <label class="labelBilder">
                    <input
                      type="radio"
                      id="auswahlBildZwei"
                      class="BildButtons"
                      name="zweiBild"
                      [formControl]="form.controls.antwort"
                      value="{{ activezweibilder.label2 }}"
                    />
                    <img
                      class="BildVorRadio"
                      id="auswahlZwei"
                      src="data:image/gif;base64,{{ activezweibilder.bild2 }}"
                      width="70px"
                      height="50px"
                    />
                  </label>
                  <div>
                    <p>
                      <label class="form-check-label" for="auswahlBildZwei">
                        {{ activezweibilder.label2 }}</label
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col rowVZ">
        <button id="Vbutton" class="btn" (click)="weiter()"
        [disabled]="form.controls.antwort.value.length < 1">
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
export class OptionsComponent implements OnInit {
  public form = this.fb.group({
    antwort:[''],
  });
public Vierradio:VierRadio[]=[];
public Zweibilder:ZweiBilder[]=[];
public activevierradio:VierRadio;
public activezweibilder:ZweiBilder;
public index: number = 0;
private result:Result[]=[];
public isLoading=true;

public vierradiovisible: boolean = true; 
public zweiBildervisible: boolean = false;

  dbpush = firebase // pushen der Antworten in die DB
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Fragenkatalog');
  

  constructor(private dataservice: DataService, private questionService: QuestionService,
  private fb: FormBuilder, private router: Router) {
  }
  private setInitialData(){
    this.activevierradio=this.Vierradio[0];
    this.activezweibilder=this.Zweibilder[0];
    const docIds = [].concat
    (this.Zweibilder.map((o) => o.docid),
    this.Vierradio.map((o) => o.docid)
    );
    docIds.map((id) => {//Pusht die docid Reihenfolge in das result
      this.result.push({
        docid: id,
        antwort: '',
      });
    });
  }
  private async loadvierradio()
  {
    this.Vierradio=await this.questionService.getvierradio();//Wartet auf die Funktion, bevor Variable gefüllt wird
  }
  private async loadbild(){
    this.Zweibilder=await this.questionService.getzweibilder();
  }

  public async ngOnInit() {
    await this.loadvierradio(); //Wartet auf die Funktion
    await this.loadbild();
    this.setInitialData();
    this.isLoading=false;
  }

  weiter() {
    this.dataservice.addquestionprogress(1); //ProgressBar
    if(this.index< this.Vierradio.length + this.Zweibilder.length){
      this.result[this.index].antwort = this.form.get('antwort').value;
      this.form.get('antwort').setValue('');
      this.index=this.index+1;
      if(this.index<this.Vierradio.length){
        this.setActiveVierradio(this.index);
      }else{
        this.vierradiovisible=false;
        this.zweiBildervisible=true;
        this.setActiveZweibilder(this.index-this.Vierradio.length);
      }
    }
    if(this.index>=this.Vierradio.length+this.Zweibilder.length){
      this.pushData();
      this.router.navigate(['questions/dropdown'])
    }
  }
  private setActiveVierradio(index:number){
    this.activevierradio= this.Vierradio[index];
  }

  private setActiveZweibilder(index:number){
    this.activezweibilder= this.Zweibilder[index];
  }

  private pushData():void{ //Parameter entnimmt einzelne docid und pusht die antwort dieser ID
    this.result.map((o)=>{
      this.dbpush.doc(o.docid).set({
        antwort: o.antwort,
      })
    })
  }

  zurueck() {
    this.dataservice.addquestionprogress(-1); //ProgressBar
    if (this.index >= 0) {
      this.index--; // setzt Index eins runter
    }
    if (this.index < 0) {
      this.dataservice.sendIndexrouting1(1); // uebergibt dem Dataservice die Anweisung Temp1 zu öffnen
    }
    this.dataservice.addindexTemp2(this.index); // uebergibt dem Dataservice aktuellen Index
  }
}
interface Result {
  docid: string;
  antwort: string;
}
