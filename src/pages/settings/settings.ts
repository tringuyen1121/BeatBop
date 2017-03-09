import { Users } from './../../providers/users';
import { UserPage } from './../user/user';
import { Player } from './../../providers/player';
import { LoginPage } from './../login/login';
import { Authentication } from './../../providers/authentication';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private auth: Authentication,
    private playerService: Player,
    private userService: Users) { }

  back = () => {
    this.navCtrl.pop();
  }

  navToUser = () => {
    this.navCtrl.push(UserPage, { "id": this.auth.getUser().user_id });
  }

  logout = () => {
    if (this.playerService.isPlaying) {
      this.playerService.stopSelectedTrack();
    }
    localStorage.removeItem("user");
    this.auth.removeUser();
    this.auth.logged = false;
    this.navCtrl.setRoot(LoginPage);
  }

  alertEdit = () => {
    let alert = this.alertCtrl.create({
      title: 'Edit your info',
      inputs: [
        {
          name: 'username',
          placeholder: 'Change your username'
        },
        {
          name: 'email',
          placeholder: 'Change your email',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            console.log(data);
          }
        },
        {
          text: 'Confirm',
          handler: data => {

            let param: any = {}

            if ((data.username !== "")) {
              this.auth.checkUsername(data.username).subscribe(
                res => {
                  if (res.available) {
                    param.username = data.username;
                    if (data.email !== "") param.email = data.email;
                    this.userService.modifyUserInfo(param).subscribe(
                      res => {
                        if (res) this.notify('Your info was updated!');
                      }, err => console.log(err)
                    );
                  }
                });
            } else if (data.email != "") {
              param.email = data.email
              this.userService.modifyUserInfo(param).subscribe(
                res => {
                  if (res) this.notify('Your info was updated!');
                }, err => console.log(err)
              );
            } else this.notify('Please input something!');

          }
        }
      ]
    });
    alert.present();
  }

  alertPassword = () => {
    let alert = this.alertCtrl.create({
      title: 'Change Password',
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
        {
          name: 'confirmPassword',
          placeholder: 'Your new password again',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            console.log(data);
          }
        },
        {
          text: 'Confirm',
          handler: data => {

            if ((data.confirmPassword !== "") && (data.confirmPassword === data.newPassword)) {
              let param = { "password": data.newPassword }
              this.userService.modifyUserInfo(param).subscribe(
                res => {
                  if (res) this.notify('Your Password was changed!');
                }, err => console.log(err)
              )
            } else this.notify('Please confirm your new password!');

          }
        }
      ]
    });
    alert.present();
  }

  notify = (message: string) => {
    let alert = this.alertCtrl.create({
      title: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
