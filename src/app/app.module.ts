import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HowToComponent } from './how-to/how-to.component';
import { QuizContentComponent } from './quiz-content/quiz-content.component';
import { QuizCompleteComponent } from './quiz-complete/quiz-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HowToComponent,
    QuizContentComponent,
    QuizCompleteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
