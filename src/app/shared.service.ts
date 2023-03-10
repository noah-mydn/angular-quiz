import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  playerName : string = "";
  difficultyLevel : string ="";
  isDarkMode = new BehaviorSubject<boolean>(false);
  totalScore = new BehaviorSubject<number>(0);

  constructor() {
      
   }

   setPlayerPreference(playerName : string, difficultyLevel: string) {
    this.playerName = playerName;
    this.difficultyLevel = difficultyLevel;
   }

}
