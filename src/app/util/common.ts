import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthService } from '../services/authservice';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

declare var $: any;

@Injectable()
export class CommonUtil {

    constructor(private datePipe: DatePipe) {

    }
    mm: any;
    dd: any;

    currentdate(formate, delimiter) {
        var today = new Date();
        this.dd = today.getDate();
        this.mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (this.dd < 10) {
            this.dd = '0' + this.dd;
        }
        if (this.mm < 10) {
            this.mm = '0' + this.mm;
        }

        return this.dd + delimiter + this.mm + delimiter + yyyy;
    }



    getCurrentDateTime() {
        var date = new Date();
        return this.datePipe.transform(date, "yyyy-MM-dd hh:mm:ss")
    }

    getEmailPattern() {
        return "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    }

    getMobilePattern() {
        return "^((\\+91-?)|0)?[0-9]{10}$";
    }
}