import { UploadPage } from './../upload/upload';
import { LoginPage } from './../login/login';

import { Authentication } from './../../providers/authentication';
import { Media } from './../../providers/media';
import { Thumbnails } from './../../pipes/thumbnails';

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   private mediaList: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private media:Media,
    private auth: Authentication
  ) {}

  ionViewWillEnter() {
    this.media.getMedia().subscribe(
      res => {
        this.mediaList = res;
        console.log(this.mediaList);
      }
    )
  };

  navToUpload = () => {
    this.navCtrl.push(UploadPage);
  }

  // showMedia = (id: number) => {
  //   this.navCtrl.push(PlayerPage, { "id": id });
  // }

  logout = () => {
    localStorage.removeItem("user");
    this.auth.removeUser();
    this.auth.logged = false;
    this.navCtrl.setRoot(LoginPage);
  }

}
