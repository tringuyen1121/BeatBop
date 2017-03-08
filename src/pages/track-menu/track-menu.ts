import { Authentication } from './../../providers/authentication';
import { Media } from './../../providers/media';
import { CommentPage } from './../comment/comment';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the TrackMenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-track-menu',
  templateUrl: 'track-menu.html'
})
export class TrackMenuPage {

  private show: any = false;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public viewCtrl: ViewController,
  private media: Media,
  private auth: Authentication ) { 
    this.media.getMediaByID(this.media.getCurrentMediaID()).subscribe(
      res => {
        if (this.auth.getUser().user_id === res.user_id) this.show = true;
        console.log (this.show);
      });
  }  

  navToComment = () => {
    this.navCtrl.push(CommentPage, { "id": this.media.getCurrentMediaID() });
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
