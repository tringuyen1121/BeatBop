import { UploadPage } from './../upload/upload';
import { LoginPage } from './../login/login';

import { Authentication } from './../../providers/authentication';
import { Media } from './../../providers/media';

import { Component, ElementRef } from '@angular/core';
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

  private allMediaList: any = [];
  private bbMediaList: any = [];

  private resolutionRegex = /100x100/;
  private newResolution = '500x500';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private media: Media,
    private auth: Authentication,
    private el: ElementRef
  ) { }


  ionViewWillEnter() {
    //clear the bbMediaList
    this.bbMediaList = [];
    
    this.media.getMedia().subscribe(
      res => {
        this.allMediaList = res;
        for (let singleMedia of this.allMediaList) {

          //only display music files of our team
          if (singleMedia.title.startsWith(this.media.getKeyword())) {
            console.log(singleMedia);
            
            this.media.getCover(singleMedia.title.substring(7, singleMedia.title.length))
              .subscribe(
              res => {
                let item = res.results[0];
                if (!item || !item.artworkUrl100) {
                  //if item not found
                  singleMedia.coverUrl = '';
                } else {
                  //if item found, add coverUrl property to object.
                  singleMedia.coverUrl = item.artworkUrl100.replace(this.resolutionRegex, this.newResolution);
                  console.log(singleMedia.coverUrl);
                }

              }, err => console.log(err)
              );

            this.bbMediaList.push(singleMedia);
          }
        }
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
