import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-complete',
  templateUrl: './quiz-complete.component.html',
  styleUrls: ['./quiz-complete.component.scss']
})
export class QuizCompleteComponent {

  greeting : string ="";
  playerName : string = "";
  totalScore : number = 0;
  isDarkMode : boolean = false;

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() : void{
    this.sharedService.isDarkMode.subscribe(val => this.isDarkMode = val);
    this.sharedService.totalScore.subscribe(val => this.totalScore = val);
    this.playerName = this.sharedService.playerName;

    if(this.totalScore===0) {
      this.greeting="Too bad, "
    }
    else if(this.totalScore>0 && this.totalScore < 30) {
      this.greeting="Not bad, "
    }
    else if(this.totalScore > 30 && this.totalScore < 50) {
      this.greeting="Good job, "
    }
    else if(this.totalScore > 50 && this.totalScore < 70) {
      this.greeting="Well done, "
    }
    else if(this.totalScore > 70 && this.totalScore < 90) {
      this.greeting="Excellent, "
    }
    else {
      this.greeting="Unbelievable, "
    }
  }

  navigateToHome() : void {
    this.router.navigate(['/home']);
  }
}
