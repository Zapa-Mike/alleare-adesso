import { LocationStrategy } from '@angular/common';
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  public showNavbar = true;
  title = 'Alleare';
  constructor(private route: LocationStrategy) {}
  ngDoCheck() {
    const route = this.route.path();
    if (route.startsWith('/home') || route == '/' || route == '/intro') {
      this.showNavbar = false;
    } else {
      this.showNavbar = true;
    }
  }
}
