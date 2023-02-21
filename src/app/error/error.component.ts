import {Component} from '@angular/core';
import { SharedService } from '../shared.service';

@Component ({
    selector:'app-error',
    templateUrl:'./error.component.html',
    styles:[`.dark-error {
                background: #c93131;
                color: #fff;
    
                a {
                    color: #f0f326;
                }
            }`]
})

export class ErrorComponent {
    isDarkMode: boolean;

    constructor(private sharedService: SharedService) {}

    ngOnInit() : void {
        this.sharedService.isDarkMode.subscribe(val=> this.isDarkMode=val);
    }
}