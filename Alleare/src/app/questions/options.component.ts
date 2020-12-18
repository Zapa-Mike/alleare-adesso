import { Component, OnInit} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { VierRadio, ZweiBilder } from '../model/stories';

@Component({
  selector: 'options',
  template: `
    <mat-progress-spinner
      class="loading"
      *ngIf="isLoading"
      mode="indeterminate"
    ></mat-progress-spinner>
    <div *ngIf="!isLoading" [formGroup]="form">
      <div class="card2">
        <div *ngIf="fourRadioVisible" class="OptionQuestion">
          {{ activFourRadio.frage }}
        </div>
        <div *ngIf="!fourRadioVisible" class="OptionQuestion">
          {{ activeTwoImages.frage }}
        </div>
        <div
          *ngIf="fourRadioVisible"
          class="grid-containerRadioBAntwort CheckboxAbfrage"
        >
          <!--div lässt keinen platz zwischen-->
          <div class="grid-element form-check form-check-inline ORadio">
            <input
              type="radio"
              id="auswahlEins"
              name="vierradio"
              [formControl]="form.controls.antwort"
              value="{{ activFourRadio.antwort1 }}"
            />
            <label class="form-check-label" for="auswahlEins">
              {{ activFourRadio.antwort1 }}
            </label>
          </div>

          <div class="grid-element form-check form-check-inline ORadio">
            <input
              type="radio"
              id="auswahlZwei"
              name="vierradio"
              [formControl]="form.controls.antwort"
              value="{{ activFourRadio.antwort2 }}"
            />
            <label class="form-check-label" for="auswahlZwei">
              {{ activFourRadio.antwort2 }}
            </label>
          </div>

          <div class="grid-element form-check form-check-inline ORadio">
            <input
              type="radio"
              id="auswahlDrei"
              name="vierradio"
              [formControl]="form.controls.antwort"
              value="{{ activFourRadio.antwort3 }}"
            />
            <label class="form-check-label" for="auswahlDrei"
              >{{ activFourRadio.antwort3 }}
            </label>
          </div>

          <div class="grid-element form-check form-check-inline ORadio">
            <input
              type="radio"
              id="auswahlVier"
              name="vierradio"
              [formControl]="form.controls.antwort"
              value="{{ activFourRadio.antwort4 }}"
            />
            <label class="form-check-label" for="auswahlVier">
              {{ activFourRadio.antwort4 }}
            </label>
          </div>
        </div>

       <!--AB HIER BEGINNT BILDERTEMPLATE-->
       <div *ngIf="twoImageVisible">
          <div class="grid-containerBilderAntwort">
            <div class="grid-element radio-bild">
              <label class="labelBilder">
                <input
                  type="radio"
                  id="auswahlBildEins"
                  class="BildButtons"
                  name="zweiBild"
                  [formControl]="form.controls.antwort"
                  value="{{  activeTwoImages.label1 }}"
                />
                <img
                  class="BildVorRadio"
                  id="auswahlEins"
                  src="data:image/gif;base64,{{ activeTwoImages.bild1 }}"
                />
              </label>
              <div>
                <p class="bild-text">
                  <label class="form-check-label" for="auswahlBildEins">
                    {{  activeTwoImages.label1 }}
                  </label>
                </p>
              </div>
            </div>
            <div class="grid-element radio-bild">
              <label class="labelBilder">
                <input
                  type="radio"
                  id="auswahlBildZwei"
                  class="BildButtons"
                  name="zweiBild"
                  [formControl]="form.controls.antwort"
                  value="{{  activeTwoImages.label2 }}"
                />
                <img
                  class="BildVorRadio"
                  id="auswahlZwei"
                  src="data:image/gif;base64,{{ activeTwoImages.bild2 }}"
                />
              </label>
              <div>
                <p class="bild-text">
                  <label class="form-check-label" for="auswahlBildZwei">
                    {{  activeTwoImages.label2 }}</label
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        
     <div class="col rowVZ">
        <button id="Zbutton" class="btn" (click)="back()">
          <img src="/assets/icons/icon_arrow_back.svg" width="50" height="50" />
        </button>
        <button
          id="Vbutton"
          class="btn"
          (click)="continue()"
          [disabled]="form.controls.antwort.value.length < 1"
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
          width="auto>"
          height="auto"
          id="NovaImageOptions"
        />
      </div>
      </div>
  `,
  styleUrls: ['./questions.component.css'],
})
export class OptionsComponent implements OnInit {
  public form = this.fb.group({
    antwort: [''],
  });
  public fourRadio: VierRadio[] = [];
  public twoImages: ZweiBilder[] = [];
  public activFourRadio: VierRadio;
  public activeTwoImages: ZweiBilder;

  public index: number = 0;
  private result: Result[] = [];
  public isLoading = true;
  public fourRadioVisible: boolean = true;
  public twoImageVisible: boolean = false;


  dbpush = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Fragenkatalog');

  constructor(
    private dataservice: DataService,
    private questionService: QuestionService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  private setInitialData() {
    this.activFourRadio = this.fourRadio[this.index]; // gibt die Fragen mit dem Typ "vierradio" in der richtigen Reihenfolge aus
    this.activeTwoImages = this.twoImages[this.index]; // gibt die Fragen mit dem Typ "zweiBilder" in der richtigen Reihenfolge aus
    const docIds = [].concat(
      this.twoImages.map((o) => o.docid), // übergibt die Doc IDs von "zweiBilder" dem Array docIds
      this.fourRadio.map((o) => o.docid) // übergibt die Doc IDs von "vierRadio" dem Array docIds+
    );
    docIds.map((id) => {
      //Pusht die docid Reihenfolge in das result
      this.result.push({
        docid: id,
        antwort: '',
      });
    });
  }
  private async loadvierradio() {
    this.fourRadio = await this.questionService.getvierradio(); //Wartet auf die Funktion, bevor Variable gefüllt wird
  }
  private async loadbild() {
    this.twoImages = await this.questionService.getzweibilder();

  }

  public async ngOnInit() {
    this.index = this.dataservice.getquestionoptionsindex();
    if (this.index == 0) {
      await this.loadvierradio(); //Wartet auf die Funktion
      await this.loadbild();
      this.setInitialData(); // Setzt die anzuzeigenen Daten
    }
    if (this.index > 0) {
      // schaltet die vierRadio-Fragen aus und die zweiBilder- Fragen ein
      this.fourRadioVisible = false;
      this.twoImageVisible = true;

      await this.loadvierradio();
      await this.loadbild();
      this.setInitialData();
      this.index = this.index - 1;
      this.setActiveZweibilder(this.index - this.fourRadio.length);

    }

    this.isLoading = false;
  }

  continue() {
    this.dataservice.addquestionprogress(1); //ProgressBar
    if (this.index < this.fourRadio.length + this.twoImages.length) {
      //sammelt alle Antworten in result

      this.result[this.index].antwort = this.form.get('antwort').value;
      this.form.get('antwort').setValue('');
      this.index = this.index + 1;
      this.dataservice.addquestionindex2(this.index);
      if (this.index < this.fourRadio.length) {
        this.setActiveVierradio(this.index); // weist Antwort Index zu
      } else {
        this.fourRadioVisible = false;
        this.twoImageVisible = true;
        this.setActiveZweibilder(this.index - this.fourRadio.length);
      }
    }
    if (this.index >= this.fourRadio.length + this.twoImages.length) {
      // Routet zu dropDown.component.ts

      this.pushData();
      this.router.navigate(['questions/dropdown']);
    }
  }
  private setActiveVierradio(index: number) {
    // Speichert Antwort
    this.activFourRadio = this.fourRadio[index];
  }

  private setActiveZweibilder(index: number) {
    // Speichert Antwort
    this.activeTwoImages = this.twoImages[index];

  }

  private pushData(): void {
    //Parameter entnimmt einzelne docid und pusht die antwort dieser ID
    this.result.map((o) => {
      this.dbpush.doc(o.docid).set({
        antwort: o.antwort,
      });
    });
  }

  back() {
    this.dataservice.addquestionprogress(-1); //ProgressBar
    this.index = this.index - 1; // setzt Index eins runter
    if (this.index < this.fourRadio.length) {
      this.twoImageVisible = false;
      this.fourRadioVisible = true;
      this.setActiveVierradio(this.index);
    }
    if (this.index >= this.fourRadio.length) {
      this.fourRadioVisible = false;
      this.twoImageVisible = true;
      this.setActiveZweibilder(this.index - this.fourRadio.length);

    }
    if (this.index < 0) {
      this.dataservice.deleteindexoption();
      this.router.navigate(['/questions']);
    }
  }
}
interface Result {
  docid: string;
  antwort: string;
}