import { Component, DoCheck, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements DoCheck {
  grau = true;

  constructor(private DataService: DataService) {}

  ngDoCheck(){
    if(this.grau == true){
      
    }
    this.grau = this.DataService.getHeader();
  }
  
}
