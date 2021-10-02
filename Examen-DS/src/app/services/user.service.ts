import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json');
  public token: any;
  public identity: any;
  public url: String = "";

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login(user: any, getToken: boolean): Observable<any>{

    if(getToken != null){
      user.getToken = getToken;
    }
    return this.http.post(`${this.url}/login`,user,{headers: this.headersVar});

  }

  getIdentity(){
    var identidty2 = JSON.parse(localStorage.getItem('identity'));
    if(identidty2 != 'undefined'){
      this.identity = identidty2
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    
    var token2 = localStorage.getItem('token');
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }
    return this.token;
  }
}
