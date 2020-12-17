import { Component, DoCheck } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tipps',
  templateUrl: './tipps.component.html',
  styleUrls: ['./tipps.component.css']
})
export class TippsComponent implements DoCheck {

  category: boolean=true;


  constructor(private dataservice:DataService){
  }

  ngDoCheck(){
  }
}
