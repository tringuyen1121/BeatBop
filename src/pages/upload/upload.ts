import { HomePage } from './../home/home';
import { Media } from './../../providers/media';

import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/*
  Generated class for the Upload page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {

 private loader;
 private fileName: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private uploadService: Media,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

 fileChange = (evt: any) => {
    const file = evt.target.files;
    this.fileName = file[0].name;
  }

  upload = (event, value: any) => {
    this.showLoading("Uploading...")
    //console.log(evt.target.querySelector('input[type=file]'));
    const fileElement = event.target.querySelector('input[type=file]');
    const file = fileElement.files[0];

    const fd = new FormData();
    fd.append('file', file);
    //append the keyword to the begining of title
    fd.append('title', this.uploadService.getKeyword() + value.title);
    fd.append('description', value.description);

    this.uploadService.uploadMedia(fd)
      .subscribe(
      data => {
        if (data) {
          this.loader.dismiss();
          this.navCtrl.pop(HomePage);
        }
      }, err => {
        this.loader.dismiss();
        console.log(err);

        let alert = this.alertCtrl.create({
          title: 'Upload Fail',
          subTitle: "Something went wrong!",
          buttons: ['OK']
        });
        alert.present(prompt);
      }
      );
  }

  showLoading = (message: string) => {
    this.loader = this.loadCtrl.create({
      content: message
    });
    this.loader.present();
  }

}
