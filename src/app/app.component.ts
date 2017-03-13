import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';
import { UserPage } from './../pages/user/user';
import { SearchPage } from './../pages/search/search';
import { UploadPage } from './../pages/upload/upload';

import { Authentication } from './../providers/authentication';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform, 
    public menuCtrl: MenuController,
    private auth: Authentication) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Upload', component: UploadPage },
      { title: 'Search', component: SearchPage },
      { title: 'Chart', component: HomePage },
      { title: 'Profile', component: UserPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    if (page.title === 'Home') {
      this.menuCtrl.close();
    } else if (page.title === 'Profile') {
      this.nav.push(page.component, { "id": this.auth.getUser().user_id });
    } else this.nav.push(page.component);
  }

  
}
