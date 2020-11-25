import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { RouteNameResolverService } from '../services/route-name-resolver-service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-nova',
  templateUrl: './nova.component.html',
  styleUrls: ['./nova.component.css'],
})
export class NovaComponent implements OnInit {
  NameIntro: string;
  previousRoute: string = '';

  constructor(private routerService: RoutingService, private routeResolver: RouteNameResolverService) {}

  ngOnInit(): void {
    var docRef = firebase
      .firestore()
      .collection('Benutzer')
      .doc(localStorage.getItem('hans'));

    docRef.get().then((doc) => {
      if (doc.exists) {
        this.NameIntro = doc.data().Name;
        this.getPreviousRoute();
      }
    });
  }

  public getPreviousRoute() {
    this.previousRoute = this.routerService.getPreviousUrl();
  }

  public resolveRoute(route: string) {
    return this.routeResolver.resolveRoute(route);
  }
}
