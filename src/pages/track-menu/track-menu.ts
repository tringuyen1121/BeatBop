import { HomePage } from './../home/home';
import { Authentication } from './../../providers/authentication';
import { Media } from './../../providers/media';
import { CommentPage } from './../comment/comment';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private media: Media,
    private auth: Authentication) {
    this.media.getMediaByID(this.media.getCurrentMediaID()).subscribe(
      res => {
        if (this.auth.getUser().user_id === res.user_id) this.show = true;
      });
  }

  navToComment = () => {
    this.navCtrl.push(CommentPage, { "id": this.media.getCurrentMediaID() });
  }

  deleteTrack = () => {
    let alert = this.alertCtrl.create({
      title: 'Delete this track?',
      message: 'Are you sure to delete this track? Any deleted tracks cannot be recovered.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.media.deleteMedia(this.media.getCurrentMediaID()).subscribe(
              res => {
                console.log(res);
                this.notify('File was deleted successfully! Please press BACK!');
              }, err => console.log(err)
            );
          }
        }
      ]
    });
    alert.present();
  }

  notify = (message: string) => {
    let alert = this.alertCtrl.create({
      title: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.popToRoot();
        }
      }]
    });
    alert.present();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
