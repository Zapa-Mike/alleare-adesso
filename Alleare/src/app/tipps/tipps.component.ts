  
import { Component } from '@angular/core';

@Component({
  selector: 'app-tipps',
  templateUrl: './tipps.component.html',
  styleUrls: ['./tipps.component.css'],
})
export class TippsComponent {
  category: boolean = true; // schaltet Kategorien an und aus 

  constructor() {}
}