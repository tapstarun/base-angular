import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
@Input() videoData:any;
@Input() howThumbs:boolean;
@Input() rightThumbs:boolean;
@Input() ShowVideo:boolean;
@Input() url:string;
@Input() showThumbs:boolean;
@Output() videoEnded= new EventEmitter<string>();
data:any;


correctThumbIcon='https://appliedvisionbaseball.com/wp-content/uploads/2020/03/newredthump.png';
wrongThumbIcon='https://appliedvisionbaseball.com/wp-content/uploads/2020/03/newgreenthump.png';

  constructor() { }

  ngOnInit(): void {
  }

  videoPlayerInit(data) {
    this.videoData = data;
    console.log(" videoPlayerInit function calling");
    //this.videoData.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.videoData.getDefaultMedia().subscriptions.pause.subscribe(this.initVdo.bind(this));
    this.videoData.getDefaultMedia().subscriptions.ended.subscribe(this.onVideoEnded.bind(this));
  }

  

  initVdo(){
    console.log(" initVdo function calling");
    console.log("video pause");
    this.videoData.play();
  }

  onVideoEnded(){
    this.videoEnded.emit(this.videoData);   
  }


}
