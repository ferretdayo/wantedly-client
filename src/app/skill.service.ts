import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SkillService {

  constructor(
    private http: Http,
  ) {
  }
  /**
   * Skillの追加
   */
  addSkillTag(data: Object): Observable<any>{
    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://localhost:3000/tags", body, options)
      .map(this.extractData)
  }


  /**
   * Skillに１つカウント（押したユーザの）追加
   */
  addSkill(data: Object): Observable<any>{
    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://localhost:3000/tags", body, options)
      .map(this.extractData)
  }

  /**
   * ユーザのスキル情報を取得
   */
  getUserSkill(user_id: number){
    return this.http.get("http://localhost:3000/users/" + user_id)
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
