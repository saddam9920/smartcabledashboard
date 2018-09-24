import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from "@angular/router";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

declare var $: any;
@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {
   object=[];
  constructor(private localstorage: LocalStorageService,private _loadingBar: SlimLoadingBarService, private router: Router) {
    this.json();
  }

  ngAfterViewInit() {
    $(function () { $("#side-menu").metisMenu() }), $(function () { $(window).bind("load resize", function () { var i = 50, n = this.window.innerWidth > 0 ? this.window.innerWidth : this.screen.width; n < 768 ? ($("div.navbar-collapse").addClass("collapse"), i = 100) : $("div.navbar-collapse").removeClass("collapse"); var e = (this.window.innerHeight > 0 ? this.window.innerHeight : this.screen.height) - 1; e -= i, e < 1 && (e = 1), e > i && $("#page-wrapper").css("min-height", e + "px") }); for (var i = window.location, n = $("ul.nav a").filter(function () { return this.href == i }).addClass("active").parent(); ;) { if (!n.is("li")) break; n = n.parent().addClass("in").parent() } });
    
  }

  logout() {
    this.localstorage.clearAll();
    this.router.navigate(['/signin']);
  }
    json(){
      let object=[  {
        partner_name: 'HDFC',
        policycategory: 'Life Insurance',
        policy_title: '25 Lakh Sum Assured',
        policy_count: 90,
        gta_amount: 289031.560546875,
        policy_daily_count: 0,
        gta_daily_amount: 0 },
       {
        partner_name: 'HDFC',
        policycategory: 'Life Insurance',
        policy_title: '50 Lakh Sum Assured',
        policy_count: 949,
        gta_amount: 6404157,
        policy_daily_count: 18,
        gta_daily_amount: 130467.5 },
       {
        partner_name: 'HDFC',
        policycategory: 'Life Insurance',
        policy_title: '75 Lakh Sum Assured',
        policy_count: 496,
        gta_amount: 5288082.90234375,
        policy_daily_count: 11,
        gta_daily_amount: 114884.80078125 },
        {
            partner_name: 'HDFC',
            policycategory: 'ABC Category',
            policy_title: '75 Lakh Sum Assured',
            policy_count: 496,
            gta_amount: 5288082.90234375,
            policy_daily_count: 11,
            gta_daily_amount: 114884.80078125 },
       {
        partner_name: 'ICICI Lombard',
        policycategory: 'Travel Insurance',
        policy_title: 'Multi Trip Worldwide Medical',
        policy_count: 4,
        gta_amount: 6235,
        policy_daily_count: 0,
        gta_daily_amount: 0 },
       {
        partner_name: 'ICICI Lombard',
        policycategory: 'Travel Insurance',
        policy_title: 'Multi Trip Worldwide Travel',
        policy_count: 3,
        gta_amount: 6300,
        policy_daily_count: 0,
        gta_daily_amount: 0 },
       {
        partner_name: 'ICICI Lombard',
        policycategory: 'Travel Insurance',
        policy_title: 'Multi Trip Worldwide Travel and Medical',
        policy_count: 9,
        gta_amount: 37463,
        policy_daily_count: 0,
        gta_daily_amount: 0 },
       {
        partner_name: 'ICICI Lombard',
        policycategory: 'Travel Insurance',
        policy_title: 'Single Trip Domestic',
        policy_count: 20,
        gta_amount: 4524,
        policy_daily_count: 0,
        gta_daily_amount: 0 },
       {
        partner_name: 'ICICI Lombard',
        policycategory: 'Travel Insurance',
        policy_title: 'Single Trip Worldwide',
        policy_count: 26,
        gta_amount: 72539,
        policy_daily_count: 0,
        gta_daily_amount: 0 },
       {
        partner_name: 'ICICI Lombard',
        policycategory: 'Travel Insurance',
        policy_title: 'Single Trip Worldwide exc USA and Canada',
        policy_count: 12,
        gta_amount: 20017,
        policy_daily_count: 0,
        gta_daily_amount: 0 },
       {
        partner_name: 'Star Health & Allied Insurance',
        policycategory: 'Health Insurance',
        policy_title: '10 Lakh Sum Assured',
        policy_count: 45,
        gta_amount: 765041.2001953125,
        policy_daily_count: 0,
        gta_daily_amount: 0 },
       {
        partner_name: 'Star Health & Allied Insurance',
        policycategory: 'Health Insurance',
        policy_title: '15 Lakh Sum Assured',
        policy_count: 47,
        gta_amount: 1015248.400390625,
        policy_daily_count: 0,
        gta_daily_amount: 0 },
       {
        partner_name: 'Star Health & Allied Insurance',
        policycategory: 'Health Insurance',
        policy_title: '5 Lakh Sum Assured',
        policy_count: 81,
        gta_amount: 867795.6005859375,
        policy_daily_count: 0,
        gta_daily_amount: 0 } ];

        let array=[];
        

        let cat ={

        }

        for(let i=0;i<object.length;i++){
         if(object[i]==object[i-1]){
          array.push({"cat":object[i].policycategory});         
         }else{
          array.push({"partner":object[i].partner_name});
         }
        }
        
        console.log(JSON.stringify(array));

    }
  
}
