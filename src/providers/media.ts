import { Authentication } from './authentication';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Media provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Media {

  private url: string = 'http://media.mw.metropolia.fi/wbma';
  // private user: any =  JSON.parse(localStorage.getItem("user"));
  private token: string = '';
  private limit: number = 10;

  constructor(public http: Http, private authService: Authentication) {}

  getMedia = () => {
    return this.http.get(this.url + '/media')
      .map(
      res =>
        res.json()
      );
  }

  getMediaByID = (id: number) => {
    return this.http.get(this.url + '/media/' + id)
      .map(
      res =>
        res.json()
      );
  }

  getUserByID = (id: number) => {
    this.token = this.authService.getUser().token;
    return this.http.get(this.url + '/users/' + id + '?token=' + this.token)
      .map(
      res =>
        res.json()
      );
  }

  uploadMedia = (formContent: any) => {
    this.token = this.authService.getUser().token;
    return this.http.post(this.url + '/media?token=' + this.token, formContent)
      .map(
      res => 
        res.json()
      );
  }

}
