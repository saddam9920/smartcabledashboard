import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { LocalStorageService } from 'angular-2-local-storage';
declare var $: any;

@Component({
    selector: 'banner-master',
    templateUrl: 'usermaster.component.html',
    providers:[LocalStorageService]
})
export class UserMasterComponent {
    user:any;
    constructor(private localstorage:LocalStorageService,private router:Router){   
    }

    ngOnInit(){
       
    }

}
