import { LoginPage } from './../login/login';
import { Authentication } from './../../providers/authentication';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private registerService: Authentication) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['',  Validators.required],
      password: ['', Validators.required],
      full_name: [''],
      terms: [false, Validators.pattern('true')]
    });
  }

  register = (value: any) => {
    //console.log(value);
    this.registerService.setUser(value);
    this.registerService.getUser().terms = undefined;
    this.registerService.register().subscribe(
      res => {
        if (res) {
          this.navCtrl.push(LoginPage);
        }
      }, err => {
        console.log(err);

        let alert = this.alertCtrl.create({
          title: 'Register Fail',
          subTitle: "Username is existed!",
          buttons: ['OK']
        });
        alert.present(prompt);
      });
  }

  back = () => {
    this.navCtrl.pop();
  }

}
