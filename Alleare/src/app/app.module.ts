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
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { TippsComponent } from './tipps/tipps.component';
import { NovaComponent } from './nova/nova.component';
import { IntroComponent } from './intro/intro.component';
import { HeaderComponent } from './header/header.component';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { createCustomElement } from '@angular/elements';

import { StoriesComponent } from './questions/stories.component';
import { RadioComponent } from './questions/radio.component';
import { DataService } from './services/data.service';
import { novadialogComponent } from './intro/novadialog.component';
import { insuranceComponent } from './intro/insurance.component';
import { OptionsComponent } from './questions/options.component';
import { DropDownComponent } from './questions/dropDown.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    QuestionsComponent,
    QuizComponent,
    FaqComponent,
    SettingsComponent,
    FlashcardsComponent,
    TippsComponent,
    NovaComponent,
    IntroComponent,
    HeaderComponent,
    EvaluationComponent,
    StoriesComponent,
    RadioComponent,
    novadialogComponent,
    insuranceComponent,
    OptionsComponent,
    DropDownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [DataService,AngularFirestore],
  bootstrap: [AppComponent]
  
})
export class AppModule {

  
  }
 
