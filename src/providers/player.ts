import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AudioProvider } from 'ionic-audio';
import 'rxjs/add/operator/map';

/*
  Generated class for the Player provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Player {

  public isPlaying: boolean = false;
  private trackId: number;

  constructor(
    public http: Http,
    private audioProvider: AudioProvider) { }

  getTrackId = () => {
    return this.trackId;
  }

  setTrackId = () => {
    this.trackId = this.audioProvider.current;
  }

  getTrackList = () => {
    return this.audioProvider.tracks;
  }

  getPlayingTrack = () => {
    return this.audioProvider.tracks[this.trackId];
  }

  playSelectedTrack = (id) => {
    if (this.audioProvider.current == undefined) {
      // use AudioProvider to control selected track 
      this.audioProvider.play(id);
      this.setTrackId();
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
