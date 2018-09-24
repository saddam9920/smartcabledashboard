import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';



@Injectable()
export class UserService {

  serverPath = "http://localhost:3000/";
  dirpath = "user/";

  constructor(private http: Http, private httpClient: HttpClient, public localstorage: LocalStorageService) {
  }

  signUp(json: any) {
    var params = json;
    return this.httpClient.post(this.serverPath + "auth/signup", params);
  }
  getUserData() {
    return this.httpClient.get(this.serverPath + this.dirpath + "list");
  }

  activeUser(json:any){
    var params = json;    
    return this.httpClient.post(this.serverPath + this.dirpath + "activeUser",params);    
  }

  
  getUserById(id:any){
    return this.httpClient.get(this.serverPath + this.dirpath + "getUserById/"+id);    
  }

  updateUserById(id:any,json:any){
    var params = json;    
    return this.httpClient.post(this.serverPath + this.dirpath + "update/"+id,params);    
  }

  getBannerData() {
    return this.httpClient.get(this.serverPath + "banner/"+ "list");
  }

  insertBanner(json: any) {
    var params = json;    
    return this.httpClient.post(this.serverPath + "banner/"+ "insertBanner",params);
  }

  updateBannerById(id:any,json:any){
    var params = json;    
    return this.httpClient.post(this.serverPath + this.dirpath + "updateBanner/"+id,params);    
  }

  uploadFile(json:FormData){
    return this.httpClient.post(this.serverPath +"upload",json);    
  }

  getBannerById(id:any){
    return this.httpClient.get(this.serverPath + "banner/" + "getBannerById/"+id);    
  }

}
