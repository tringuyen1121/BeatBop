import { Authentication } from './../../providers/authentication';
import { Favourite } from './../../providers/favourite';
import { Media } from './../../providers/media';
import { Comment } from './../../providers/comment';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import * as moment from 'moment';

/*
  Generated class for the Comment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})
export class CommentPage {

  private id: number;
  private commentList: any = [];
  private likeNumber: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private commentService: Comment,
    private mediaService: Media,
    private auth: Authentication,
    private fav: Favourite) {
    this.id = this.navParams.get("id");
  }

  ionViewWillEnter() {
    this.fav.getFavouriteByFile(this.id)
      .subscribe(
      res => {
        this.likeNumber = res.length;
      });

    this.displayComment();
  }

  back = () => {
    this.navCtrl.pop();
  }

  displayComment = () => {
    let date = new Date();
    this.commentService.getCommentsOfId(this.id)
      .subscribe(
      res => {
        this.commentList = res;
        for (let comment of this.commentList) {
          this.mediaService.getUserByID(comment.user_id).subscribe(
            res => {
              comment.username = res.username;
              comment.time = moment(comment.time_added).fromNow();
            });
        }
      });
  }

  postComment = (value: any) => {
    let data = { "file_id": this.id, "comment": value.comment };
    this.commentService.postComment(data).subscribe(
      res => {
        console.log(res);
        this.displayComment();
      }, err => {
        console.log(err);
      });
  }

  presentConfirm(e, id: number, user_id: number) {
    console.log(this.auth.getUser().user_id);
    console.log(user_id);
    console.log(id);
    if (this.auth.getUser().user_id === user_id) {
      let alert = this.alertCtrl.create({
        title: 'Delete this comment?',
        message: 'Are you sure to delete this comment? Any deleted comments cannot be undone.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => {
              this.commentService.deleteComment(id);
              this.displayComment();
            }
          }
        ]
      });
      alert.present();
    }
  }
}
