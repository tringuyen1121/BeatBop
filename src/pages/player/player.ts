import { TrackMenuPage } from './../track-menu/track-menu';
import { Media } from './../../providers/media';
import { Authentication } from './../../providers/authentication';

import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
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

  public isPlaying: boolean = false;

  private resolutionRegex = /100x100/;
  private newResolution = '500x500';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private audioProvider: AudioProvider,
    public popoverCtrl: PopoverController,
    private auth: Authentication,
    private media: Media) {
    this.id = this.navParams.get("id");
  }

  ionViewWillEnter() {
    console.log(this.isPlaying);

    this.media.getMediaByID(this.id)
      .subscribe(
      res => {
        this.selectedMedia = res;
        this.selectedMedia.preload = 'metadata';
        this.selectedMedia.id = res.file_id;
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
  }

  back = () => {
    this.pauseSelectedTrack();
    this.navCtrl.pop();
  }

  infoTrack = (track) => {
    console.log(track);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(TrackMenuPage);
    popover.present({
      ev: myEvent
    });
  }

  operateSelectedTrack = () => {
    if (!this.isPlaying) this.playSelectedTrack();
    else this.pauseSelectedTrack();
  }

  playSelectedTrack = () => {
    this.isPlaying = true;
    // use AudioProvider to control selected track 
    this.audioProvider.play(this.selectedMedia.id);
  }
  
  pauseSelectedTrack= () => {
    this.isPlaying = false;
     // use AudioProvider to control selected track
     this.audioProvider.pause(this.selectedMedia.id);
  }
         
  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }
}
