import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/authservice';
import { HttpResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { LocalStorageService } from 'angular-2-local-storage';
import { CommonUtil } from '../util/common';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    auth: AuthService;

    token: any = "";
    param: any;
    checktokenexpiry: boolean = false;

    constructor(private injector: Injector,private _loadingBar:SlimLoadingBarService, private router: Router,public localstorage:LocalStorageService,private commonUtil:CommonUtil) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("i m in interceptor" + req);
        this._loadingBar.start();
        
        let authenticationService = this.injector.get(AuthService);

        if (req.url.indexOf("upload") > 0) {
            console.log("insidedd");
            var authheader = 'Bearer ' + this.localstorage.get('token');            
            const authreq = req.clone({ setHeaders: { Authorization: authheader,'encrypt': 'multipart/form-data'}});            
            return next.handle(authreq);
        }
                
        var authheader = 'Bearer ' + this.localstorage.get('token');
        const authreq = req.clone({ setHeaders: { Authorization: authheader } });
        console.log(authreq);
        return next.handle(authreq).
            do(event => {
                if (event instanceof HttpResponse) {
                    this._loadingBar.complete();
                    
                    // const elapsed = Date.now() - started;
                    // console.log('%c Request for ' + this.fixUrl(req.urlWithParams) + ' took ' + elapsed + ' ms.', 'background: #222; color: yellow');
                }
            })
            ._finally(() => {
                this._loadingBar.complete();
            })
            .catch((res) => {
                console.log(res);
                if (res.status === 401 || res.status === 403) {
                    var params = {
                        "currentdate": ""+this.commonUtil.currentdate
                    }
                    console.log("inside")
                    return authenticationService.token(params).flatMap((data: any) => {
                        console.log("GFDF" + JSON.stringify(data));
                        if (data.token !== '') {
                            this.localstorage.set('token', data.token);
                        } else {
                            this.localstorage.remove('currentUser');
                            this.localstorage.remove('token');
                            this.router.navigate(['/signin']);
                            return Observable.throw(res);
                        }
                        let clonedRequestRepeat = req.clone({
                            headers: req.headers.set('Authorization', 'Bearer ' + this.localstorage.get('token'))
                            // url: this.fixUrl(req.url)
                        });
                        return next.handle(clonedRequestRepeat).do(event => {
                            if (event instanceof HttpResponse) {
                                this._loadingBar.complete();
                                
                            }
                        });
                    });

                } else {
                    return Observable.throw(res);
                }


            });
    }
}