import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuizComponent } from './quiz/quiz.component';
import { FaqComponent } from './faq/faq.component';
import { SettingsComponent } from './settings/settings.component';
import { InfosComponent } from './infos/infos.component';
import { TippsComponent } from './tipps/tipps.component';
import { NovaComponent } from './nova/nova.component';
import { IntroComponent } from './intro/intro.component';
import { HeaderComponent } from './header/header.component';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { StoriesComponent } from './questions/stories.component';
import { DataService } from './services/data.service';
import { novadialogComponent } from './intro/novadialog.component';
import { insuranceComponent } from './intro/insurance.component';
import { OptionsComponent } from './questions/options.component';
import { DropDownComponent } from './questions/dropDown.component';

import { RoutingService } from '../app/services/routing.service';
import { RouteNameResolverService } from './services/route-name-resolver-service';
import { categoriesComponent } from './tipps/categories.component';
import { QuestionsToTipsComponent } from './nova/questions-to-tips/questions-to-tips.component';
import { TipQuestionComponent } from './nova/questions-to-tips/tip-question/tip-question.component';
import { QuestionsToQuizComponent } from './nova/questions-to-quiz/questions-to-quiz.component';
import { QuizQuestionComponent } from './nova/questions-to-quiz/quiz-question/quiz-question.component';
import { QuestionsToQuestionaireComponent } from './nova/questions-to-questionaire/questions-to-questionaire.component';
import { QuestionaireQuestionComponent } from './nova/questions-to-questionaire/questionaire-question/questionaire-question.component';
import { QuestionsToSettingsComponent } from './nova/questions-to-settings/questions-to-settings.component';
import { SettingsQuestionsComponent } from './nova/questions-to-settings/settings-questions/settings-questions.component';
import { QuestionsToInfosComponent } from './nova/questions-to-infos/questions-to-infos.component';
import { InfoQuestionComponent } from './nova/questions-to-infos/info-question/info-question.component';
import { FourAnswersComponent } from './quiz/four-answers.component';
import { TwoAnswersComponent } from './quiz/two-answers.component';
import { evaluationComponent } from './quiz/evaluation.component';
import { googleformularComponent } from './home/googleformular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { QuizService } from './services/quiz.service';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    QuestionsComponent,
    QuizComponent,
    FaqComponent,
    SettingsComponent,
    InfosComponent,
    TippsComponent,
    NovaComponent,
    IntroComponent,
    HeaderComponent,
    EvaluationComponent,
    StoriesComponent,
    novadialogComponent,
    insuranceComponent,
    OptionsComponent,
    DropDownComponent,
    categoriesComponent,
    QuestionsToTipsComponent,
    TipQuestionComponent,
    QuestionsToQuizComponent,
    QuizQuestionComponent,
    QuestionsToQuestionaireComponent,
    QuestionaireQuestionComponent,
    QuestionsToSettingsComponent,
    SettingsQuestionsComponent,
    QuestionsToInfosComponent,
    InfoQuestionComponent,
    FourAnswersComponent,
    TwoAnswersComponent,
    evaluationComponent,
    googleformularComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatExpansionModule, //Materials
    MatInputModule, //Materials
    BrowserAnimationsModule, //Materials
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    NgCircleProgressModule.forRoot({
      radius: 55,
      outerStrokeGradient: true,
      outerStrokeWidth: 7,
      innerStrokeWidth: 2,
      animation: true,
      responsive: true,
      startFromZero: true,
      animationDuration: 750,
      titleFontSize: '20',
      subtitleFontSize: '18',
    }),
  ],
  providers: [
    DataService,
    QuizService,
    AngularFirestore,
    RoutingService,
    RouteNameResolverService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private routerExtService: RoutingService) {}
}
