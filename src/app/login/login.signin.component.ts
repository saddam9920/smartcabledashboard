import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthService } from '../services/authservice';

declare var $: any;

@Component({
    selector: 'login-signin',
    templateUrl: 'login.signin.component.html'
})
export class LoginSigninComponent {
    user: any;
    username: any = "";
    password: any = "";
    result: any;

    constructor(private authService: AuthService, private localstorage: LocalStorageService, private router: Router) {
    }

    ngOnInit() {
    }

    doLogin() {

        var params = {
            "username": this.username,
            "password": this.password
        }

        this.authService.login(params).subscribe(data => {
            console.log("dcc" + JSON.stringify(data));
            this.result = data;
            console.log(this.result.success);
            if (this.result.success) {
                this.localstorage.set('currentUser', this.result.username);
                this.router.navigate(['home'])
            }
        });
    }



}
