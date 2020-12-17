import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  constructor(public dialog: MatDialog) {}
  openImpressum() {
    this.dialog.open(Impressum); // Impressum wird aus impressum.html ins popUp geladen
  }
  openDatenschutz() {
    this.dialog.open(Datenschutzerklaerung); // Datenschutzerklärung wird aus Datenschutzerklaerung.html ins popUp geladen
  }
  openNutzungsbedingungen() {
    this.dialog.open(Nutzungsbedingungen); // Nutzungsbedingungen wird aus Nutzungsbedingungen.html ins popUp geladen
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
