import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { CommonUtil } from '../util/common';

@Injectable()
export class AuthService {
    result: any;

    serverPath = "http://localhost:3000/";

    constructor(private utils: CommonUtil, private http: Http, private httpClient: HttpClient, public localstorage: LocalStorageService) {
    }

    login(json: any) {
        var params = json;
        return this.httpClient.post(this.serverPath + "auth/signin", params)
    }

    signUp(json: any) {
        var params = json;
        return this.httpClient.post(this.serverPath + "auth/signup", params);
    }

    token(json: any) {
        var params = json;
        return this.httpClient.post(this.serverPath + "token", params);
    }

}
