import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit {

  
  
  constructor(private renderer: Renderer2) {}
  

    title : string = "THOTH";
    isDarkMode : boolean = true;
    isVolumeEnable : boolean = true;
    volumeIcon : string = "bi bi-volume-up-fill";
    modeIcon : string = "bi bi-sun-fill";
    body = document.querySelector('body');

    audio : any = new Audio();

    ngOnInit() : void {

      if(this.isDarkMode) {
        this.modeIcon = "bi bi-moon-fill";
        this.renderer.addClass(this.body,'dark-mode');
      }

      else {
        this.modeIcon = "bi bi-sun-fill";
        this.renderer.removeClass(this.body,'dark-mode')
      }

      if(this.isVolumeEnable) {
        this.audio.src = "assets/nightime.mp3";
        this.audio.load();
        this.audio.play();
      }

      else {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
    }



    volumeOnClick (): void{
      this.isVolumeEnable= !this.isVolumeEnable;
      if(this.isVolumeEnable) {
        this.volumeIcon = "bi bi-volume-up-fill";
        this.audio.src = "assets/nightime.mp3";
        this.audio.load();
        this.audio.play();
      }

      else {
        this.volumeIcon="bi bi-volume-mute-fill";
        this.audio.pause();
        this.audio.currentTime = 0;
      }
    }

    modeOnToggle () : void {
     
        this.isDarkMode = !this.isDarkMode;
        if(this.isDarkMode) {
          this.modeIcon = "bi bi-moon-fill";
          this.renderer.addClass(this.body,'dark-mode');
        }

        else {
          this.modeIcon = "bi bi-sun-fill";
          this.renderer.removeClass(this.body,'dark-mode')
        }

    }

}
