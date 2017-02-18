import { Thumbnails } from './../pipes/thumbnails';
import { UploadPage } from './../pages/upload/upload';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { Authentication } from './../providers/authentication';
import { Media } from './../providers/media';
import { HomePage } from './../pages/home/home';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page2 } from '../pages/page2/page2';

@NgModule({
  declarations: [
    MyApp,
    Page2,
    HomePage,
    LoginPage,
    RegisterPage,
    UploadPage,
    Thumbnails
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page2,
    HomePage,
    LoginPage,
    RegisterPage,
    UploadPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler },
    Media,
    Authentication,
    Thumbnails
  ]
})
export class AppModule { }
