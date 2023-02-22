import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { INSTRUCTIONS } from '../instructions/instructions';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.scss']
})
export class HowToComponent {

  instructions : {id:number, text:string}[] = INSTRUCTIONS;
  isDarkMode : boolean;

  constructor(private router: Router, private sharedService : SharedService) {}

  ngOnInit() : void {
    this.sharedService.isDarkMode.subscribe(val => this.isDarkMode=val);
  }

  navigateToPreviousPage() : void {
    window.history.back();
  }
    
}
