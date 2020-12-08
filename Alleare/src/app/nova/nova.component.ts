import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { RouteNameResolverService } from '../services/route-name-resolver-service';
import { RoutingService } from '../services/routing.service';
import {Location} from '@angular/common';

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
docRef = firebase
      .firestore()
      .collection('Benutzer')
      .doc(localStorage.getItem('hans'));

  starteIntro:boolean; 

  constructor(
    private routerService: RoutingService,
    private routeResolver: RouteNameResolverService,
    private route: ActivatedRoute,
    private location: Location,
    private router:Router
  ) {}

  ngOnInit(): void {
    

    this.docRef.get().then((doc) => {
      if (doc.exists) {
        this.nameIntro = doc.data().Name;
        this.getPreviousRoute();
      }
    });
    
  }
intro(){
  this.docRef.update({homeintro:true})
  this.router.navigate(['/intro'])
  
}
  public getPreviousRoute() {
    this.previousRoute = this.routerService.getPreviousUrl();
  }

  public resolveRoute(route: string) {
    return this.routeResolver.resolveRoute(route);
  }
  public navigateBack(){
    this.location.back();
  }
}
