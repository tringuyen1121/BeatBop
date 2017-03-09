import { Authentication } from './authentication';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Users provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Users {

  private mediaUrl: string = 'http://media.mw.metropolia.fi/wbma';
  private token: string = '';

  constructor(
    public http: Http,
    private auth: Authentication
  ) { }

  getUserInfo = (id: number) => {
    this.token = this.auth.getUser().token;
    return this.http.get(this.mediaUrl + '/users/' + id + '?token=' + this.token)
      .map(
      res =>
        res.json()
      );
  }

  modifyUserInfo = (data) => {
    this.token = this.auth.getUser().token;
    return this.http.put(this.mediaUrl + '/users/' + '?token=' + this.token, data)
      .map(
      res =>
        res.json()
      );
  }
}
