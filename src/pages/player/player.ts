import { Player } from './../../providers/player';
import { CommentPage } from './../comment/comment';
import { LoginPage } from './../login/login';
import { SearchPage } from './../search/search';
import { TrackMenuPage } from './../track-menu/track-menu';

import { Favourite } from './../../providers/favourite';
import { Media } from './../../providers/media';
import { Authentication } from './../../providers/authentication';

import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import { AudioProvider } from 'ionic-audio';

/*
  Generated class for the Player page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {

  private id: number;
  private selectedMedia: any = {};
  private sourcePath: string = 'http://media.mw.metropolia.fi/wbma/uploads/';

  private favouriteList: any = [];

  private hasLiked: boolean = false;

  private resolutionRegex = /100x100/;
  private newResolution = '500x500';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private audioProvider: AudioProvider,
    public popoverCtrl: PopoverController,
    public viewCtrl: ViewController,
    private auth: Authentication,
    private media: Media,
    private playerService: Player,
    private fav: Favourite) {
    this.id = this.navParams.get("id");
    this.media.setCurrentMediaID(this.id);
  }

  ionViewWillEnter() {
    console.log(this.audioProvider.current);
    this.hasLiked = false;

    this.media.getMediaByID(this.id)
      .subscribe(
      res => {
        this.selectedMedia = res;
        this.selectedMedia.preload = 'metadata';
        this.selectedMedia.src = this.sourcePath + res.filename;

        this.media.getUserByID(this.selectedMedia.user_id)
          .subscribe(
          resp => {
            this.selectedMedia.artist = resp.username;
          });

        this.media.getCover(this.selectedMedia.title.substring(7, this.selectedMedia.title.length))
          .subscribe(
          res => {
            let item = res.results[0];
            if (!item || !item.artworkUrl100) {
              //if item not found
              this.selectedMedia.art = '';
            } else {
              //if item found, add coverUrl property to object.
              this.selectedMedia.art = item.artworkUrl100.replace(this.resolutionRegex, this.newResolution);
            }
          });

        console.log(this.selectedMedia);
      }, err => console.log(err)
      );

    this.fav.getFavouriteByFile(this.id)
      .subscribe(
      res => {
        this.favouriteList = res;
        for (let favourite of this.favouriteList) {
          if (this.auth.getUser().user_id === favourite.user_id) {
            this.hasLiked = true;
          }
        }
      });
  }

  back = () => {
    this.playerService.stopSelectedTrack();
    this.navCtrl.pop();
  }

  navToSearch = () => {
    this.playerService.stopSelectedTrack();
    this.navCtrl.push(SearchPage)
      .then(() => {
        // find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then remove it from the navigation stack
        this.navCtrl.remove(index);
      });
  }

  navToComment = () => {
    this.navCtrl.push(CommentPage, { "id": this.id });
  }

  logout = () => {
    this.playerService.stopSelectedTrack();
    localStorage.removeItem("user");
    this.auth.removeUser();
    this.auth.logged = false;
    this.navCtrl.setRoot(LoginPage);
  }

  infoTrack = (track) => {
    console.log(track);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(TrackMenuPage);
    popover.present();
  }

  operateSelectedTrack = (id) => {
    if (!this.playerService.isPlaying) {
      this.playerService.isPlaying = true;
      this.playerService.playSelectedTrack(id);
    } else {
      this.playerService.isPlaying = false;
      this.playerService.pauseSelectedTrack();
    }
  }

  setLike = () => {
    if (!this.hasLiked) {
      let param: any = {};
      param.file_id = +this.id;
      this.fav.createFavorite(param)
        .subscribe(res => {
          this.hasLiked = true;
        });
    } else {
      this.fav.deleteFavorite(this.id)
        .subscribe(res => {
          this.hasLiked = false;
        });
    }
  }
}
