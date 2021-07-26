import { Component, OnInit } from '@angular/core';
import { AudioService } from "../services/audio.service";
import { CloudService } from "../services/cloud.service";
import { StreamState } from "../interfaces/stream-state";



@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent {

  playlist:Array<any>=[];
  files: Array<any> = [];
  state: StreamState;
  playStatus=false;
  searchTerm:string;

  currentFile: any = {};
  constructor (
    public audioService: AudioService,
    public cloudService: CloudService
  ) {
    this.cloudService.getFiles().subscribe(
      res=>{
        this.files=res.message;
      },
      err=>{
        console.log("err in reading products ",err)
        console.log("Something went wrong in reading products")
      }
    );
    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
      
    });
  }
  
  playStream(url) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }
  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
    this.playStatus=true;
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }
  nextSong(){
    if (this.state?.readableCurrentTime === this.state?.readableDuration)
    {
      this.next()
    }
  }
  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }
  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
    this.nextSong();
  }
  onSongSelect(file){
    this.playlist.push(file)
    console.log(this.playlist)
  }
  getplaylist(){
    return(this.playlist)
  }


}


