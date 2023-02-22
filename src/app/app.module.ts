import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HowToComponent } from './how-to/how-to.component';
import { QuizContentComponent } from './quiz-content/quiz-content.component';
import { QuizCompleteComponent } from './quiz-complete/quiz-complete.component';
import { ErrorComponent } from './error/error.component';
import { RouterModule,Routes } from '@angular/router';

const appRoute : Routes = [ 
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'HowTo', component:HowToComponent},
  {path:'quiz', component: QuizContentComponent},
  {path:'quizComplete', component: QuizCompleteComponent},
  {path:'**', component:ErrorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HowToComponent,
    QuizContentComponent,
    QuizCompleteComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
