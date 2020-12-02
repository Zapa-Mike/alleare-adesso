import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase';
import { RouteNameResolverService } from '../services/route-name-resolver-service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-nova',
  templateUrl: './nova.component.html',
  styleUrls: ['./nova.component.css'],
})
export class NovaComponent implements OnInit {
  nameIntro: string = this.route.snapshot.paramMap.get('name');
  previousRoute: string = '';
  toggleQuestionsToTips = false;
  toggleQuestionsToQuiz = false;
  toggleQuestionsToQuestionaire = false;
  toggleQuestionsToSettings = false;
  toggleQuestionsToInfos = false;

  constructor(
    private routerService: RoutingService,
    private routeResolver: RouteNameResolverService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var docRef = firebase
      .firestore()
      .collection('Benutzer')
      .doc(localStorage.getItem('hans'));

    docRef.get().then((doc) => {
      if (doc.exists) {
        this.nameIntro = doc.data().Name;
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
