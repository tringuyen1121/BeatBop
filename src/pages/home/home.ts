import { SettingsPage } from './../settings/settings';
import { PlayerPage } from './../player/player';
import { SearchPage } from './../search/search';
import { UploadPage } from './../upload/upload';
import { LoginPage } from './../login/login';

import { Authentication } from './../../providers/authentication';
import { Media } from './../../providers/media';
import { Player } from './../../providers/player';

import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

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

  private playerBarShown: boolean = false;
  private playingTrack: any = {};

  private coverPath: string = './assets/images/cover.jpg';

  private resolutionRegex = /100x100/;
  private newResolution = '500x500';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private media: Media,
    private auth: Authentication,
    private playerService: Player,
    private el: ElementRef
  ) { }


  ionViewWillEnter() {
    //clear the bbMediaList
    this.bbMediaList = [];

    this.media.getMedia().subscribe(
      res => {
        this.allMediaList = res.files;
        for (let singleMedia of this.allMediaList) {

          this.media.getMediaByID(singleMedia.file_id).subscribe(
            res => {
              singleMedia = res;

              //only display music files of our team
              if (singleMedia.title.startsWith(this.media.getKeyword()) && singleMedia.media_type === 'audio') {

                this.media.getCover(singleMedia.title.substring(7, singleMedia.title.length))
                  .subscribe(
                  res => {
                    let item = res.results[0];
                    if (!item || !item.artworkUrl100) {
                      //if item not found
                      singleMedia.art = this.coverPath;
                    } else {
                      //if item found, add coverUrl property to object.
                      singleMedia.art = item.artworkUrl100.replace(this.resolutionRegex, this.newResolution);
                    }
                    this.bbMediaList.unshift(singleMedia);
                  }, err => console.log(err)
                  )
              }
            });
        }
      });
  }

  navToUpload = () => {
    this.navCtrl.push(UploadPage);
  }

  showMedia = (id: number) => {
    this.navCtrl.push(PlayerPage, { "id": id });
  }

  navToSearch = () => {
    this.navCtrl.push(SearchPage);
  }

  navToSetting = () => {
    this.navCtrl.push(SettingsPage);
  }

}
