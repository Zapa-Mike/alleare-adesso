import { LocationStrategy } from '@angular/common';
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  public showNavbar = true;
  public showheader = true;
  title = 'Alleare';
  constructor(private route: LocationStrategy) {}
  ngDoCheck() {
    // Controls Navbar and Header on all screens
    const route = this.route.path();
    if (route.startsWith('/home')) {
      this.showNavbar = false;
      this.showheader = true;
    } else if (route.startsWith('/intro')) {
      this.showNavbar = false;
      this.showheader = false;
    } else {
      this.showNavbar = true;
      this.showheader = true;
    }
  }
}
