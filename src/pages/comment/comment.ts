import { Media } from './../../providers/media';
import { Comment } from './../../providers/comment';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private commentService: Comment,
    private mediaService: Media) {
    this.id = this.navParams.get("id");
  }

  ionViewWillEnter(){
    this.displayComment();
  }

  back = () => {
    this.navCtrl.pop();
  }

  displayComment = () => {
    this.commentService.getCommentsOfId(this.id)
      .subscribe(
      res => {
        this.commentList = res;
        for (let comment of this.commentList) {
          this.mediaService.getUserByID(comment.user_id).subscribe(
            res => {
              comment.username = res.username;
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
}
