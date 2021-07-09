import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {
    IDRMLicenseServer,
    VgApiService,
    BitrateOptions,
} from '@videogular/ngx-videogular/core';
import {
    VgDashDirective,
    VgHlsDirective,
} from '@videogular/ngx-videogular/streaming';
import { Subscription, timer } from 'rxjs';

export interface IMediaStream {
    type: 'vod' | 'dash' | 'hls';
    source: string;
    label: string;
    token?: string;
    licenseServers?: IDRMLicenseServer;
}

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

@ViewChild(VgDashDirective, { static: true }) vgDash: VgDashDirective;
@ViewChild(VgHlsDirective, { static: true }) vgHls: VgHlsDirective;


dataEmit=false;
data:any;
timeout:any;
correctThumbIcon='/assets/icons/newredthump.png';
wrongThumbIcon='/assets/icons/newgreenthump.png';

  constructor() { }
  
  ngOnInit() {
    // this.currentStream = this.streams[0];
   }
 

  videoPlayerInit(data) {
    console.log('player init');
    this.dataEmit=false;
    this.videoData = data;
    
     //this.videoData.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.videoData.getDefaultMedia().subscriptions.play.subscribe(this.playVideo.bind(this));
    this.videoData.getDefaultMedia().subscriptions.pause.subscribe(this.initVdo.bind(this));
    this.videoData.getDefaultMedia().subscriptions.ended.subscribe(this.onVideoEnded.bind(this));
   
  }
  

  onVideoseekTime(){
    


    if(!this.dataEmit){

      let currentTime =this.videoData.getDefaultMedia().currentTime;
      //console.log(currentTime);
      if(currentTime>=4){
        this.dataEmit=true;
        this.videoDuration.emit(true);
        clearTimeout(this.timeout);      
        return;
      }

 

    this.timeout=setTimeout(()=>{
        this.onVideoseekTime();
      },10);
  }
  }


  initVdo(){
    
    this.videoData.play();
  }
  playVideo(){
    this.dataEmit=false;
    this.onVideoseekTime();
    // this.timeout=setTimeout(()=>{
    //   this.onVideoseekTime();
    // },10);

    this.videoPlay.emit(false);
  }

  onVideoEnded(){
    
    clearTimeout(this.timeout);
    this.videoEnded.emit(this.videoData);   
  }

  

  /***
   * 
   * 
   * For hls video
   */

  
  bitrates: BitrateOptions[];
  // set quality of the video 
  setBitrate(option: BitrateOptions) {
    //let length= this.bitrates.length-1;
  //  console.log();
     console.log(this.bitrates);
     console.log(option);
    // console.log(this.vgHls);
    
    // this.vgHls.setBitrate(option);
}

onGetBitrates($event) {
  console.log($event);
  
  // Manipalute $event and add your labels
 // this.dashBitrates = yourManipulatedEvent;
}
  /*
   currentStream: IMediaStream;
   api: VgApiService;

   bitrates: BitrateOptions[];

   streams: IMediaStream[] = [
      //  {
      //      type: 'hls',
      //      label: 'm3u8',
      //      source: 'https://cdn.jwplayer.com/manifests/gi2pb1VW.m3u8',
      //  }
       {
           type: 'hls',
           label: 'HLS: Streaming',
           source:
               'https://cdn.jwplayer.com/manifests/gi2pb1VW.m3u8',
       },
   ];

   onPlayerReady(api: VgApiService) {
       this.api = api;
   }

   

   setBitrate(option: BitrateOptions) {
       switch (this.currentStream.type) {
           case 'dash':
               this.vgDash.setBitrate(option);
               break;

           case 'hls':
               this.vgHls.setBitrate(option);
               break;
       }
   }

   onClickStream(stream: IMediaStream) {
       this.api.pause();
       this.bitrates = null;

       const source = timer(1000, 2000);

       const timerSubscription: Subscription = source.subscribe(() => {
           this.currentStream = stream;

           timerSubscription.unsubscribe();
       });
   }
   */
}
