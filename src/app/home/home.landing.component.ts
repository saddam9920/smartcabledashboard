import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { LocalStorageService } from 'angular-2-local-storage';
declare var $: any;

@Component({
    selector: 'home-landing',
    templateUrl: 'home.landing.component.html',
    providers: [LocalStorageService]
})

export class HomeLandingComponent {
    user: any;
    constructor(private localstorage: LocalStorageService, private router: Router) {
    }

    ngOnInit() {
       
    }

    ngAfterViewInit() {
        $(function () { $("#side-menu").metisMenu() }), $(function () { $(window).bind("load resize", function () { var i = 50, n = this.window.innerWidth > 0 ? this.window.innerWidth : this.screen.width; n < 768 ? ($("div.navbar-collapse").addClass("collapse"), i = 100) : $("div.navbar-collapse").removeClass("collapse"); var e = (this.window.innerHeight > 0 ? this.window.innerHeight : this.screen.height) - 1; e -= i, e < 1 && (e = 1), e > i && $("#page-wrapper").css("min-height", e + "px") }); for (var i = window.location, n = $("ul.nav a").filter(function () { return this.href == i }).addClass("active").parent(); ;) { if (!n.is("li")) break; n = n.parent().addClass("in").parent() } });
    }


}
