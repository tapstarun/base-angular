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
@Input() url:string;
@Input() showThumbs:boolean;
@Output() videoEnded= new EventEmitter<string>();
@Output() videoPlay= new EventEmitter<boolean>();
@Output() videoDuration= new EventEmitter<boolean>();
data:any;
timeout:any;
correctThumbIcon='https://appliedvisionbaseball.com/wp-content/uploads/2020/03/newredthump.png';
wrongThumbIcon='https://appliedvisionbaseball.com/wp-content/uploads/2020/03/newgreenthump.png';

  constructor() { }

  ngOnInit(): void {
  }

  videoPlayerInit(data) {
    this.videoData = data;
     //this.videoData.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.videoData.getDefaultMedia().subscriptions.play.subscribe(this.playVideo.bind(this));
    this.videoData.getDefaultMedia().subscriptions.pause.subscribe(this.initVdo.bind(this));
    this.videoData.getDefaultMedia().subscriptions.ended.subscribe(this.onVideoEnded.bind(this));
   
  }
  
  onGetBitrates(event:any){
    console.log(event);
    
  }
  onHls(event:any){
    console.log(event);
    
  }
  onVideoseekTime(){
    let currentTime =this.videoData.getDefaultMedia().currentTime
    

    if(currentTime>=4){
      console.log(currentTime);
      
      this.videoDuration.emit(true);
      clearTimeout(this.timeout);      
      return;
    }

   this.timeout=setTimeout(()=>{
      this.onVideoseekTime();
    },10);
  }


  initVdo(){
   
    this.videoData.play();
  }
  playVideo(){
    
    this.timeout=setTimeout(()=>{
      this.onVideoseekTime();
    },10);

    this.videoPlay.emit(false);
  }

  onVideoEnded(){
    clearTimeout(this.timeout);
    this.videoEnded.emit(this.videoData);   
  }

 

}
