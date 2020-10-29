import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public showNavbar = true;
  title = 'Alleare';
  constructor(private route: LocationStrategy) {}
  ngOnInit() {
    const route = this.route.path();
    if (route.startsWith('/home') || route == "/") {
      this.showNavbar = false;
    } else {
      this.showNavbar = true;
    }
  }
}
