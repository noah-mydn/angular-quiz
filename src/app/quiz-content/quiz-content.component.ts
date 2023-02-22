import { Component, Renderer2} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SharedService } from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-content',
  templateUrl: './quiz-content.component.html',
  styleUrls: ['./quiz-content.component.scss']
})
export class QuizContentComponent {

  playerName : string = "";
  difficultyLevel : string ="";
  quizObjects : any[];
  currentQuestionIndex:number=0;
  isLoading : boolean = true;
  totalScore : number = 0;
  
  private _isDarkMode : boolean = false;

  set isDarkMode (value:boolean) {
    this._isDarkMode = value;
  }

  get isDarkMode() {
    return this._isDarkMode;
  }

    constructor(private sharedService: SharedService, private renderer: Renderer2, private http: HttpClient,
     private route:Router) {}

    ngOnInit() : void {

      //Getting DarkMode Value via Service
      this.sharedService.isDarkMode.subscribe(val => this.isDarkMode = val);

    }

    ngAfterViewInit() : void{

      //Assigning playerName and chosen level via Service
      this.playerName = this.sharedService.playerName;
      this.difficultyLevel= this.sharedService.difficultyLevel; 

      switch(this.difficultyLevel) {
        case "EASY" : this.fetchEasyQuiz(); break;
        case "MEDIUM" : this.fetchMediumQuiz(); break;
        case "HARD" : this.fetchHardQuiz(); break;

        default:
          this.fetchEasyQuiz();

          console.log(this.difficultyLevel);
      }

    }

    //For Data from Api Calls
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
                //console.log(this.quizObjects);
              });
               
              setTimeout(() => {
                this.isLoading = false;
            }, 3000);
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
                //console.log(this.quizObjects);
               })
               setTimeout(() => {
                this.isLoading = false;
            }, 3000);
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
                  //console.log(this.quizObjects);
                })
                setTimeout(() => {
                  this.isLoading = false;
              }, 3000);
    }

    

    //PrevQuestion
    goToPrevQuestion() : void {
      this.currentQuestionIndex=this.currentQuestionIndex-1;
    }

    //NextQuestion
    goToNextQuestion(): void {
      if (this.currentQuestionIndex === this.quizObjects.length - 1) {
        //Transferring Total Score via SharedService
        this.sharedService.totalScore.next(this.totalScore);
        this.route.navigate(['quizComplete']);
      } else {
        this.currentQuestionIndex = this.currentQuestionIndex + 1;
      }
      console.log(this.currentQuestionIndex);
      console.log(this.quizObjects.length - 1);
    }
    
    //After the selction is made
    onChoiceSelected(quiz: any, choice: string, index:number) {
    
      const CORRECT_ANSWER = quiz.correct_answer;
      const selectedEl = document.getElementById(choice+index);
  
      if (choice === CORRECT_ANSWER) {
          this.totalScore= this.totalScore+5;
          selectedEl.style.backgroundColor = 'green';
          selectedEl.style.pointerEvents='none';
  
          for (var i = 0; i < quiz.incorrect_answers.length; i++) {
              const el = document.getElementById(quiz.incorrect_answers[i]+index);
              
              el.classList.add('disabled-dark-selection');
              el.classList.add('disabled');
          }

          //console.log("Total Score:",this.totalScore);
      } else {
          selectedEl.style.backgroundColor = 'red';
          selectedEl.style.pointerEvents='none';

          const correctEl = document.getElementById(CORRECT_ANSWER+index);
          correctEl.style.backgroundColor = 'green';
          correctEl.style.pointerEvents='none';
  
          if(quiz.incorrect_answers.length>1) {
            const otherSelections = quiz.incorrect_answers.filter((selection: string) => {
              return selection !== choice;
          });

          for (var i = 0; i < otherSelections.length; i++) {
            const el = document.getElementById(otherSelections[i]+index);
            
            el.classList.add('disabled-dark-selection');
            el.classList.add('disabled');

        }
        //console.log("Unchosen wrong selections:",otherSelections);
          }

         
          // console.log("Chosen Selection",correctEl);
          // console.log("Selected choice",selectedEl);
      }
  }

  //Navigating back to home
  navigateToHome(): void {
    if (window.confirm("Are you sure you want to leave? Your progress will not be saved.")) {
      this.route.navigate(['/home']);
    }
  }
  
}
