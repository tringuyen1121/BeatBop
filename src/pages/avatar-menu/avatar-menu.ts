import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

/*
  Generated class for the AvatarMenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-avatar-menu',
  templateUrl: 'avatar-menu.html'
})
export class AvatarMenuPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvatarMenuPage');
  }

  doUpload = () => {
    this.notify('To be updated');
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
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

}
