import { Component, HostListener, Renderer2, ViewChild, ElementRef, AfterViewInit, OnInit, AfterViewChecked } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { SharedService } from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild ('textStyle', {static:true}) svgText!: ElementRef;
  @ViewChild ('home_container',{static:true}) home_container!: ElementRef;

  thoth_logo_width : string = "110.24429mm";
  screenWidth : any = null;
  isSmallScreen : boolean = false;
  playerName : string = '';
  isNameEmpty : boolean = false;
  isButtonClicked : boolean = false;

  private _isDarkMode : boolean = false;

  set isDarkMode (value:boolean) {
    this._isDarkMode = value;
    this.setStrokeColor();
    this.setMode();
  }

  get isDarkMode() {
    return this._isDarkMode;
  }
  svg_style_text :any;
  
  
  constructor (private renderer: Renderer2, private sharedService : SharedService, private route: Router) {
  }
  
  ngOnInit() : void{
    this.isNameEmpty= false;

    anime({
      targets: '#thoth path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 3000,
      delay: function(el, i ) { return i * 400 },
      direction: 'alternate',
      loop: true
     })

      this.screenWidth = window.innerWidth;

      if(this.screenWidth < 600) {
        this.isSmallScreen= true;
      }

      if(this.isSmallScreen) {
        this.thoth_logo_width="80.24429mm";
      }

      this.sharedService.isDarkMode.subscribe(val => this.isDarkMode = val);

  }

  ngAfterViewInit() : void {
    this.setStrokeColor();
    this.setMode();

  }

  private setStrokeColor() {
    
    if (this.isDarkMode) {
      this.renderer.setAttribute(this.svgText.nativeElement, 'stroke',"#c2e9fb");
    } 

    else {
      this.renderer.setAttribute(this.svgText.nativeElement,'stroke',"#5957a3");
    }
  }

  private setMode() {
    if(this.isDarkMode) {
      this.renderer.addClass(this.home_container.nativeElement,'dark');
    }

    else {
      this.renderer.removeClass(this.home_container.nativeElement,'dark');
    }
  }

  setDifficultyLevel(level : string) {
    this.isButtonClicked=true;
    if(this.playerName) {
      this.isNameEmpty = false;
      this.sharedService.setPlayerPreference(this.playerName,level);
      this.route.navigate(['quiz']);
    }
    if(this.playerName === '') {
      this.isNameEmpty= true;
    }
    console.log(this.isNameEmpty);
    console.log(this.playerName);
  }

  ngDoCheck() {
    if(this.isButtonClicked) {
      if(this.playerName) {
        this.isNameEmpty = false;
      }
      else {
        this.isNameEmpty= true;
        }
    }
   
  }


  @HostListener('window:resize', ['$event']) onWindowResize() {
    this.screenWidth= window.innerWidth;
    if(this.screenWidth < 600) {
      this.isSmallScreen= true;
    }
    else {
      this.isSmallScreen=false;
    }

    if(this.isSmallScreen) {
      this.thoth_logo_width="80.24429mm";
    }
    else {
      this.thoth_logo_width="110.24429mm";
    }
  }


    
}
