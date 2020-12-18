import { Component, DoCheck} from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements DoCheck {
  grey = true;

  constructor(private DataService: DataService) {}

  ngDoCheck(){
    this.grey = this.DataService.getHeader();
  }
  
}
