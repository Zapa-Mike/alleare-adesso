import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { InfosComponent } from './infos/infos.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { NovaComponent } from './nova/nova.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuizComponent } from './quiz/quiz.component';
import { SettingsComponent } from './settings/settings.component';
import { TippsComponent } from './tipps/tipps.component';
import { EvaluationComponent} from './evaluation/evaluation.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/intro', pathMatch: 'full' },
  { path: 'quiz', component: QuizComponent },
  { path: 'tipps', component: TippsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'infos', component: InfosComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'nova', component: NovaComponent },
  { path: 'intro', component: IntroComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'evaluation', component: EvaluationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
