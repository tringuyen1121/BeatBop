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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController ) { }

  close() {
    this.viewCtrl.dismiss();
  }

}
