import { Authentication } from './../../providers/authentication';
import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private showLogin: boolean = true;

  private currentUser: any = {};
  private dataFromServer: any = {};

  private loader;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private auth: Authentication) { }

  ionViewWillEnter() {
    if (localStorage.getItem("user") !== null) {
      this.auth.setUser(JSON.parse(localStorage.getItem("user")));
      this.auth.logged = true;
      this.navCtrl.setRoot(HomePage);
    } else if (this.auth.getUser().password !== undefined) {
      console.log(this.auth.getUser());
      this.login(this.auth.getUser());
    }
  }

  navigate = () => {
    this.navCtrl.push(RegisterPage);
  }

  login = (value: any) => {
    if (this.showLogin) {
      this.showLoading("Logging in...");

      this.auth.setUser(value);

      this.auth.login().subscribe(resp => {
        console.log(resp);
        if (resp) {
          this.dataFromServer = resp;
          this.currentUser = this.dataFromServer.user;
          this.auth.setUser(this.currentUser);
          this.currentUser.token = this.dataFromServer.token;
          console.log(this.currentUser);
          localStorage.setItem("user", JSON.stringify(this.currentUser));
          this.auth.logged = true;
          console.log("Login Succeeded");
          this.showLogin = false;
          this.loader.dismissAll();
          this.navCtrl.setRoot(HomePage);
        }
      }, err => {
        console.log(err);

        this.loader.dismiss();

        let alert = this.alertCtrl.create({
          title: 'Login Fail',
          subTitle: "Username or Password is incorrect!",
          buttons: ['OK']
        });
        alert.present(prompt);
      });
    } else {
      this.showLogin = true;
    }
  }

  showLoading = (message: string) => {
    this.loader = this.loadCtrl.create({
      content: message
    });
    this.loader.present();
  }

}
