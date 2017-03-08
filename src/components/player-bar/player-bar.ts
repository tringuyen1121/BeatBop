import { Media } from './../../providers/media';
import { Component } from '@angular/core';
import { AudioProvider } from 'ionic-audio';


/*
  Generated class for the PlayerBar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'player-bar',
  templateUrl: 'player-bar.html'
})
export class PlayerBarComponent {

  private playingTrackList: any = [];

  constructor(
    private audioProvider: AudioProvider,
    private media: Media,
  ) {
    this.playingTrackList = this.audioProvider.tracks;
    console.log(this.playingTrackList);
  }

  playSelectedTrack = (id) => {
    if (this.audioProvider.current == undefined) {
      // use AudioProvider to control selected track 
      this.audioProvider.play(id);
    } else this.audioProvider.play(this.audioProvider.current);
  }

  pauseSelectedTrack = () => {
    // use AudioProvider to control selected track
    this.audioProvider.pause(this.audioProvider.current);
  }

  stopSelectedTrack = () => {
    // use AudioProvider to control selected track
    this.audioProvider.stop(this.audioProvider.current);
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }

}
