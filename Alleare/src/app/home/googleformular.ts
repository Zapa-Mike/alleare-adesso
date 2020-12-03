import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';
import { DataService } from '../services/data.service';


@Component({
  selector: 'googleformular',
  template: `
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfiBIVkt1SCta35LESqZx9T4ddPhobfavuTXDH4YZiXNjzyyQ/viewform?embedded=true" width="100%" height="80%" frameborder="0" marginheight="0" marginwidth="0">Wird geladen…</iframe>
<div class="btn123">
      <button
        type="button"
        class="btn btn-default"
        (click)="reload()"
      >
        Zurück
      </button>
    </div>
  `,
  styleUrls: ['./home.component.css'],
})
export class googleformularComponent{

    public reload(){
        location.reload();
      }
}
