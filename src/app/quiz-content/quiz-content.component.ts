import { Component, Renderer2, ViewChild,ElementRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SharedService } from '../shared.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-quiz-content',
  templateUrl: './quiz-content.component.html',
  styleUrls: ['./quiz-content.component.scss']
})
export class QuizContentComponent {

  playerName : string = "";
  difficultyLevel : string ="EASY";
  quizObjects : any[];
  currentQuestionIndex:number=0;
  isLoading : boolean = true;
  choiceMade : boolean = false;

  private _isDarkMode : boolean = false;

  set isDarkMode (value:boolean) {
    this._isDarkMode = value;
    this.setMode();
  }

  get isDarkMode() {
    return this._isDarkMode;
  }

  //ElementRef for quiz_container to manipulate class if it's darkmode
  @ViewChild('quiz_container', {static:true}) quiz_container!:ElementRef;

    constructor(private sharedService: SharedService, private renderer: Renderer2, private http: HttpClient,
     ) {}

    ngOnInit() : void {

      //Getting DarkMode Value via Service
      this.sharedService.isDarkMode.subscribe(val => this.isDarkMode = val);

      switch(this.difficultyLevel) {
        case "EASY" : this.fetchEasyQuiz(); break;
        case "MEDIUM" : this.fetchMediumQuiz(); break;
        case "HARD" : this.fetchHardQuiz(); break;

        default:
          this.difficultyLevel="EASY";
          this.fetchEasyQuiz();
      }

    }

    

    ngAfterViewInit() : void{

      //Assigning playerName and chosen level via Service
      this.playerName = this.sharedService.playerName;
      this.difficultyLevel= this.sharedService.difficultyLevel;

      if(this.isLoading===false) {
        
       }
     
    }

    //For DarkMode
    private setMode() {
      if(this.isDarkMode) {
        this.renderer.addClass(this.quiz_container.nativeElement,'dark');
      }
  
      else {
        this.renderer.removeClass(this.quiz_container.nativeElement,'dark');
      }
    }

    //For Api Calls
     fetchEasyQuiz() : void {
      this.isLoading=true;
      this.http.get<any>("https://opentdb.com/api.php?amount=20&category=18&difficulty=easy")
               .subscribe((res)=>{
                let quizzes: any[] =res.results; 
                //Restructuring Array
                this.quizObjects  = quizzes.map((question:any)=> {
                  const {correct_answer, incorrect_answers} = question;
                  const choices = [...incorrect_answers,correct_answer];
                  return {...question,choices};
              })
                console.log(this.quizObjects);});
               
      this.isLoading=false;
    }

    fetchMediumQuiz() : void {
      this.isLoading=true;
      this.http.get<any>("https://opentdb.com/api.php?amount=20&category=18&difficulty=medium")
               .subscribe((res)=>{
                let quizzes: any[] =res.results; 
                //Restructuring Array
                this.quizObjects  = quizzes.map((question:any)=> {
                  const {correct_answer, incorrect_answers} = question;
                  const choices = [...incorrect_answers,correct_answer];
                  return {...question,choices};
              })
                console.log(this.quizObjects);
               })
      this.isLoading=false;
    }

    fetchHardQuiz() : void {
      this.isLoading=true;
      this.http.get<any>("https://opentdb.com/api.php?amount=20&category=18&difficulty=hard")
                .subscribe((res)=>{
                  let quizzes: any[] =res.results; 
                  //Restructuring Array
                  this.quizObjects  = quizzes.map((question:any)=> {
                    const {correct_answer, incorrect_answers} = question;
                    const choices = [...incorrect_answers,correct_answer];
                    return {...question,choices};
                })
                  console.log(this.quizObjects);
                })
      this.isLoading=false;
    }

    

    //PrevQuestion
    goToPrevQuestion() : void {
      this.currentQuestionIndex=this.currentQuestionIndex-1;
    }

    //NextQuestion
    goToNextQuestion(): void {
      this.currentQuestionIndex=this.currentQuestionIndex+1;
    }
}
