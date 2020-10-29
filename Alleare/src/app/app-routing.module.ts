import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { NovaComponent } from './nova/nova.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuizComponent } from './quiz/quiz.component';
import { SettingsComponent } from './settings/settings.component';
import { TippsComponent } from './tipps/tipps.component';

const routes: Routes = [
{path: 'home', component: HomeComponent},
{ path: '',  redirectTo: '/home', pathMatch:'full'},
{ path: 'quiz', component: QuizComponent},
{ path: 'tipps', component: TippsComponent},
{ path: 'faq', component: FaqComponent},
{ path: 'flashcards', component: FlashcardsComponent},
{ path: 'settings', component: SettingsComponent},
{ path: 'nova', component: NovaComponent},
{ path: 'intro', component: IntroComponent},
{ path: 'questions', component: QuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
