import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  openImpressum() {
  this.dialog.open(Impressum);

  }
  openDatenschutz() {
  this.dialog.open(Datenschutzerklaerung);

  }
  openNutzungsbedingungen(){
    this.dialog.open(Nutzungsbedingungen);
  }
  ngOnInit(): void {
  }
}
@Component({
  selector: 'impressum',
  templateUrl: 'impressum.html',
})
export class Impressum {}

@Component({
  selector: 'datenschutzerklaerung',
  templateUrl: 'Datenschutzerklaerung.html',
})
export class Datenschutzerklaerung {}

@Component({
  selector: 'nutzungsbedingungen',
  templateUrl: 'Nutzungsbedingungen.html',
})
export class Nutzungsbedingungen {}


