import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json');
  public url: String = "";

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getPolls(token: any):Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);
    return this.http.get(`${this.url}/getPollsUser`, {headers: headersToken});
  }

  addPoll( poll: {}, token: any):Observable<any>{
    let params = JSON.stringify(poll);
    let headersToken = this.headersVar.set('Authorization', token);
    return this.http.post(`${this.url}/addPoll`, params, {headers: headersToken} );
  }
}
