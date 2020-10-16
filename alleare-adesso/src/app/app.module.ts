import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { QuestionComponent } from './components/question/question.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [AppComponent, StartScreenComponent, QuestionComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
