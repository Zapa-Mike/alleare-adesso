import { Component, DoCheck} from '@angular/core';
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
    this.grau = this.DataService.getHeader();
  }
}
