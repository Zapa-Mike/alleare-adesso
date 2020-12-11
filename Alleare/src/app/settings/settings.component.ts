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
    const textRef = this.dialog.open(Impressum);

    textRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'impressum.html',
})
export class Impressum {}
