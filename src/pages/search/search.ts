import { PlayerPage } from './../player/player';

import { Media } from './../../providers/media';

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private resultList: any = [];
  private resolutionRegex = /100x100/;
  private newResolution = '500x500';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private media: Media
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  search = (title) => {
    this.resultList = [];

    this.media.searchMedia(title)
      .subscribe(
      res => {
        for (let singleMedia of res) {

          if (singleMedia.title.startsWith(this.media.getKeyword())) {
            this.media.getUserByID(singleMedia.user_id)
              .subscribe(
              res => {
                singleMedia.artist = res.username;
              }
              )

            this.media.getCover(singleMedia.title.substring(7, singleMedia.title.length))
              .subscribe(
              res => {
                let item = res.results[0];
                if (!item || !item.artworkUrl100) {
                  //if item not found
                  singleMedia.art = '';
                } else {
                  //if item found, add coverUrl property to object.
                  singleMedia.art = item.artworkUrl100.replace(this.resolutionRegex, this.newResolution);
                }

                this.resultList.push(singleMedia);
              });
          }
        }
      }, err => console.log(err)
      );
  }

  showMedia = (id: number) => {
    this.navCtrl.push(PlayerPage, { "id": id });
  }

  toRoot = () => {
    this.navCtrl.popToRoot();
  }

  back = () => {
    this.navCtrl.pop();
  }
}
