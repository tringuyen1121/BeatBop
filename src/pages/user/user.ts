import { Authentication } from './../../providers/authentication';
import { AvatarMenuPage } from './../avatar-menu/avatar-menu';
import { SettingsPage } from './../settings/settings';
import { UploadPage } from './../upload/upload';
import { SearchPage } from './../search/search';
import { PlayerPage } from './../player/player';

import { Media } from './../../providers/media';
import { Users } from './../../providers/users';

import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

/*
  Generated class for the User page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  private id: number;
  private selectedUser: any = {};

  private mediaList: any = [];
  private editable: boolean = false;

  private coverPath: string = './assets/images/cover.jpg';
  private resolutionRegex = /100x100/;
  private newResolution = '500x500';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private userService: Users,
    private auth: Authentication,
    private mediaService: Media) {
    this.id = this.navParams.get("id");
  }

  ionViewWillEnter() {
    this.editable = false;
    if (this.auth.getUser().user_id === this.id) {
      this.editable = true;
    }
    this.mediaList = [];

    this.userService.getUserInfo(this.id).subscribe(
      res => {
        this.selectedUser = res;
        console.log(this.selectedUser);
      }, err => console.log(err)
    );

    this.mediaService.getMediaByUser(this.id).subscribe(
      res => {
        let temp = res;
        for (let singleMedia of temp) {

          this.mediaService.getMediaByID(singleMedia.file_id).subscribe(
            res => {
              singleMedia = res;

              //only display music files of our team
              if (singleMedia.title.startsWith(this.mediaService.getKeyword())) {

                this.mediaService.getCover(singleMedia.title.substring(7, singleMedia.title.length))
                  .subscribe(
                  res => {
                    let item = res.results[0];
                    if (!item || !item.artworkUrl100) {
                      //if item not found
                      singleMedia.art = this.coverPath;
                    } else {
                      //if item found, add coverUrl property to object.
                      singleMedia.art = item.artworkUrl100.replace(this.resolutionRegex, this.newResolution);
                    }
                    this.mediaList.unshift(singleMedia);
                  }, err => console.log(err)
                  )
              }
            });
        }
      });

  }

  back = () => {
    this.navCtrl.pop();
  }

  toRoot = () => {
    this.navCtrl.popToRoot();
  }

  navToSearch = () => {
    this.navCtrl.push(SearchPage);
  }

  navToUpload = () => {
    this.navCtrl.push(UploadPage);
  }

  showMedia = (id: number) => {
    this.navCtrl.push(PlayerPage, { "id": id });
  }

  navToSetting = () => {
    this.navCtrl.push(SettingsPage);
  }

  popAvatarMenu(myEvent) {
    if (this.auth.getUser().user_id === this.id) {
      let popover = this.popoverCtrl.create(AvatarMenuPage);
      popover.present();
    }
  }

}
