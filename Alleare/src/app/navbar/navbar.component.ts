import { LocationStrategy } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements DoCheck {
  homeIcon: string;
  tippsIcon: string;
  quizIcon: string;
  faqIcon: string;
  infosIcon: string;
  home = '/assets/icons/icon_w_home.svg';
  tipps = '/assets/icons/icon_w_tips.svg';
  quiz = '/assets/icons/icon_w_quiz.svg';
  faq = '/assets/icons/icon_w_faq.svg';
  infos = '/assets/icons/icon_w_flashcards.svg';
  homeD = '/assets/icons/icon_w_home_disabled.svg';
  tippsD = '/assets/icons/icon_w_tips_disabled.svg';
  quizD = '/assets/icons/icon_w_quiz_disabled.svg';
  faqD = '/assets/icons/icon_w_faq_disabled.svg';
  infosD = '/assets/icons/icon_w_flashcard_disabled.svg';

  collections = [
    'Fragenkatalog',
    '_Fragenkatalog',
    'Images_Story',
    'Images_Fragen',
    'Images_Radio',
    'Flashcards',
  ];

  constructor(private route: LocationStrategy) {}

  ngDoCheck() {
    // Controls Navbar and Header on all screens
    const route = this.route.path();

    if (route.startsWith('/quiz')) {
      this.homeIcon = this.homeD;
      this.tippsIcon = this.tippsD;
      this.quizIcon = this.quiz;
      this.faqIcon = this.faqD;
      this.infosIcon = this.infosD;
    } else if (route.startsWith('/tipps')) {
      this.homeIcon = this.homeD;
      this.tippsIcon = this.tipps;
      this.quizIcon = this.quizD;
      this.faqIcon = this.faqD;
      this.infosIcon = this.infosD;
    } else if (route.startsWith('/faq')) {
      this.homeIcon = this.homeD;
      this.tippsIcon = this.tippsD;
      this.quizIcon = this.quizD;
      this.faqIcon = this.faq;
      this.infosIcon = this.infosD;
    } else if (route.startsWith('/infos')) {
      this.homeIcon = this.homeD;
      this.tippsIcon = this.tippsD;
      this.quizIcon = this.quizD;
      this.faqIcon = this.faqD;
      this.infosIcon = this.infos;
    } else if (route.startsWith('/nova') || route.startsWith('/settings')) {
      this.homeIcon = this.homeD;
      this.tippsIcon = this.tippsD;
      this.quizIcon = this.quizD;
      this.faqIcon = this.faqD;
      this.infosIcon = this.infosD;
    }
  }
}
