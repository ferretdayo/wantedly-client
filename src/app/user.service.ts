import { Injectable } from '@angular/core';

import { Http, Response, Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  times: number;

  constructor(
    private http: Http,
    private jsonp: Jsonp,
  ) {
    this.times=0;
  }

  createUser(): Observable<any[]>{
    /**
     * https://github.com/angular/angular/pull/14270
     * http2.4.7だとバグがあるみたいなので、それに対処
     */
    let params = new URLSearchParams();
    params.set('callback', '__ng_jsonp__.__req'+this.times+'.finished');
    this.times++;
    return this.jsonp.get("http://127.0.0.1:3000/users?" + params)
      .map(this.extractData);
      //.catch(this.handleError);
  }

  // レスポンスデータの整形処理
  private extractData(res: Response) {
      if (res.status < 200 || res.status >= 300) {
          throw new Error('Bad response status: ' + res.status);
      }
      let body = res.json();
      return body || { };
  }
  // エラー処理
  private handleError (error: any) {
      // In a real world app, we might send the error to remote logging infrastructure
      let errMsg = error.message || 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }

}
