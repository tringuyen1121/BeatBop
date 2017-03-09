import { AvatarMenuPage } from './../pages/avatar-menu/avatar-menu';
import { SettingsPage } from './../pages/settings/settings';
import { Users } from './../providers/users';
import { UserPage } from './../pages/user/user';
import { Player } from './../providers/player';
import { Comment } from './../providers/comment';
import { CommentPage } from './../pages/comment/comment';
import { Favourite } from './../providers/favourite';
import { TrackMenuPage } from './../pages/track-menu/track-menu';
import { PlayerPage } from './../pages/player/player';
import { Title } from './../pipes/title';
import { SearchPage } from './../pages/search/search';
import { JsonpModule } from '@angular/http';
import { Thumbnails } from './../pipes/thumbnails';
import { UploadPage } from './../pages/upload/upload';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { Authentication } from './../providers/authentication';
import { Media } from './../providers/media';
import { HomePage } from './../pages/home/home';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicAudioModule } from 'ionic-audio';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    UploadPage,
    Thumbnails,
    SearchPage,
    Title,
    PlayerPage,
    TrackMenuPage,
    CommentPage,
    UserPage,
    SettingsPage,
    AvatarMenuPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    JsonpModule,
    IonicAudioModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    UploadPage,
    SearchPage,
    PlayerPage,
    TrackMenuPage,
    CommentPage,
    UserPage,
    SettingsPage,
    AvatarMenuPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler },
    Media,
    Authentication,
    Thumbnails,
    Favourite,
    Comment,
    Player,
    Users
  ]
})
export class AppModule { }
