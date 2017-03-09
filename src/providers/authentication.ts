import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Authentication provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Authentication {

  logged: Boolean = false;

  private url: string = 'http://media.mw.metropolia.fi/wbma';

  private user: any = {};

  constructor(public http: Http) {
    console.log('Hello Login Provider');
  }

  setUser = (user) => {
    this.user = user;
  };

  getUser = () => {
    return this.user;
  }

  removeUser = () => {
    this.user = {};
  }

  login = () => {
    return this.http.post(this.url + '/login', this.user)
      .map(
      res =>
        res.json()
      );
  }

  register = () => {
    return this.http.post(this.url + '/users', this.user)
      .map(
      res =>
        res.json()
      );
  }

  checkUsername = (username: string) => {
    return this.http.get(this.url + '/users/username/' + username)
      .map(
      res =>
        res.json()
      );
  }

}
