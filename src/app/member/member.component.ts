import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
import { MemberService } from './member.service';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

	
	 
	  


	authForm = new FormGroup({
		firstName: new FormControl(''),
		lastName: new FormControl(''),
	  });
	  get authFormControls() { return this.authForm.controls; }	  
  showMemberPage:boolean;
  memberPageData:any;
  videoUrl:any;
  mainTab:any;
  tutorialTab:any;
  hitDrillTab:any;
  mostPopularTab:any;
  swingTab:any;
  url=environment.Url;
  showloader:boolean;
  quizDataForMember:any;
  videoData:any;
  videoPlay:any;
  videoEnded:any;
  mainTabShow:false;
  constructor(
	  private memberService:MemberService,
	  private sanitizer:DomSanitizer,
	  private router:Router,
	  private route:ActivatedRoute,
	  private authService:AuthService
	) { 
		this.showloader=false;
	  this.showMemberPage=false;
	 
  	}

  ngOnInit(): void {
	this.memberPageSetting();
	}

  memberPageSetting(){
	this.showloader=true;
	let userData = this.authService.userDetails();
	
	this.memberService.getMemberPageData(userData.userId).subscribe((res:any)=>{
		this.showloader=false;
		this.memberPageData=res.data;
		this.showMemberPage=true;
		
		this.videoUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.memberPageData.web_video_url+'?rel=0&modestbranding=1&autohide=0&loop=1&showinfo=0&controls=0&autoplay=1&mute=1');
		
		console.log(this.memberPageData);

		this.memberService.getCarousel(this.memberPageData.main_tab).subscribe((carousel:any)=>{			
			
    		const authToken=userData.authToken;
			this.mainTab=carousel.map((res:any)=>{
				console.log(res);
				if(res.slug=='statistic-page' || res.slug=='leadership'){
					return {...res,url:res.url+'?user='+authToken};
				}
				return res;
			})
			console.log(this.mainTab);
			
		})
		
		this.memberService.getCarousel(this.memberPageData.tutorials).subscribe((carousel:any)=>{
			this.tutorialTab= carousel;
		})
		this.memberService.getCarousel(this.memberPageData.courses_drills).subscribe((carousel:any)=>{
			this.hitDrillTab= carousel;
		})
		 // 1224 Most Popular Pitchers
		 
		 this.memberService.memberPageCarouselApi().subscribe((carousel:any)=>{
			this.quizDataForMember= carousel.data;
			console.log(this.quizDataForMember);
		})

	});

	
  }


 playQuiz(quizId:string){
	this.router.navigate(['quiz',quizId]);
 }
 



 ThreeInARowSlider = {"slidesToShow": 3, "slidesToScroll": 3,"infinite": true,  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
};
 fourInARowSlider = {"slidesToShow": 4, "slidesToScroll": 4,"infinite": true,  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]};
 fiveRowSlider = {"slidesToShow": 5, "slidesToScroll": 5,  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]};

 
 videoPlayerInit(data) {
    this.videoData = data;
    this.videoData.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.videoData.getDefaultMedia().subscriptions.pause.subscribe(this.initVdo.bind(this));
    this.videoData.getDefaultMedia().subscriptions.ended.subscribe(this.initVdo.bind(this));
  }

  

  initVdo(){
	  console.log('Play');
    this.videoData.play();
  }



}

