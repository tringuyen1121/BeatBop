import { SearchPage } from './../pages/search/search';
import { UploadPage } from './../pages/upload/upload';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page2 } from '../pages/page2/page2';
import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Upload', component: UploadPage },
      { title: 'Search', component: SearchPage }
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
    } else {
      this.nav.push(page.component);
    }
  }
}
