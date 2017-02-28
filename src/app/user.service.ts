import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  times: number;

  constructor(
    private http: Http,
  ) {
    this.times=0;
  }
  /**
   * ユーザの作成のリクエストの送信
   */
  createUser(data: Object): Observable<any>{
    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post("/users", body, options)
      .map(this.extractData)
  }

  /**
   * ログインのリクエストの送信
   */
  loginUser(data: Object): Observable<any>{
    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post("/logins", body, options)
      .map(this.extractData)
  }

  /**
   * 全てのユーザを取得
   */
  getUsers(): Observable<any>{
    return this.http.get("/users", {withCredentials: true})
      .map(this.extractData)
  }

  // レスポンスデータの整形処理
  private extractData(res: Response) {
      if (res.status < 200 || res.status >= 300) {
          throw new Error('Bad response status: ' + res.status);
      }
      let body = res.json();
      console.log(body)
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
