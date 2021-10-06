import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json');
  public url: String = "";

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addResult(result: {}, id: string):Observable<any>{
    let params = JSON.stringify(result);
    return this.http.post(`${this.url}/addResult/${id}`, params, {headers: this.headersVar});
  }

  getResultsPoll(id: string, token: any):Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);
    return this.http.get(`${this.url}/getResultsByPoll/${id}`, {headers: headersToken});
  }
}
