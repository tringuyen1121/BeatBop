import { Authentication } from './authentication';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Jsonp } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the Media provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Media {

  private mediaUrl: string = 'http://media.mw.metropolia.fi/wbma';
  // private user: any =  JSON.parse(localStorage.getItem("user"));
  private token: string = '';
  private limit: number = 10;

  private keyword: string = 'b34tb0p'; //use to distinguish files of our team

  iTunesUrl: string = 'https://itunes.apple.com/search?media=music&term='

  constructor(public http: Http, private authService: Authentication, private jsonp: Jsonp) { }

  getKeyword = () => {
    return this.keyword;
  }

  getMedia = () => {
    return this.http.get(this.mediaUrl + '/media/all')
      .map(
      res =>
        res.json()
      );
  }

  getMediaByID = (id: number) => {
    return this.http.get(this.mediaUrl + '/media/' + id)
      .map(
      res =>
        res.json()
      );
  }

  getUserByID = (id: number) => {
    this.token = this.authService.getUser().token;
    return this.http.get(this.mediaUrl + '/users/' + id + '?token=' + this.token)
      .map(
      res =>
        res.json()
      );
  }

  uploadMedia = (formContent: any) => {
    this.token = this.authService.getUser().token;
    return this.http.post(this.mediaUrl + '/media?token=' + this.token, formContent)
      .map(
      res =>
        res.json()
      );
  }

  //get CoverArt of a song using Itunes Search API
  getCover = (title: string) => {
    return this.jsonp.get(this.iTunesUrl + title + '&callback=JSONP_CALLBACK')
      .map(
      res =>
        res.json()
      );
  }

  searchMedia = (title) => {
    this.token = this.authService.getUser().token;
    return this.http.post(this.mediaUrl + '/media/search?token=' + this.token, title)
      .map(
      res =>
        res.json()
      );
  }

}
