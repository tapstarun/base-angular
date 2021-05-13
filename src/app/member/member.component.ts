import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
import { MemberService } from './member.service';

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
  constructor(
	  private memberService:MemberService,
	  private sanitizer:DomSanitizer,
	  private router:Router,
	  private route:ActivatedRoute,
	  
	) { 
		this.showloader=false;
	  this.showMemberPage=false;
	 
  	}

  ngOnInit(): void {
	this.memberPageSetting();
	}

  memberPageSetting(){
	this.showloader=true;
	this.memberService.getMemberPageData(477).subscribe((res:any)=>{
		this.showloader=false;
		this.memberPageData=res.data;
		this.showMemberPage=true;
		
		this.videoUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.memberPageData.video_url);
		
		console.log(this.memberPageData);

		this.memberService.getCarousel(this.memberPageData.main_tab).subscribe((carousel:any)=>{
			this.mainTab= carousel;
			
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
 
 ThreeInARowSlider: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin:10,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
  }





//==========================================================
  	fourInARowSlider: any = {
	    loop: true,
	    mouseDrag: true,
	    touchDrag: true,
	    pullDrag: false,
	    dots: true,
	    margin:10,
	    navSpeed: 700,
	    navText: ['previous', 'next'],
	    responsive: {
	      0: {
	        items: 1
	      },
	      400: {
	        items: 2
	      },
	      740: {
	        items: 3
	      },
	      940: {
	        items: 4
	      }
	    },
  	}


//===================================================

fiveRowSlider: any = {
	    loop: true,
	    mouseDrag: false,
	    touchDrag: false,
	    pullDrag: false,
	    dots: false,
	    margin:10,
	    navSpeed: 700,
	    navText: ['', ''],
	    responsive: {
	      0: {
	        items: 1
	      },
	      400: {
	        items: 2
	      },
	      740: {
	        items: 3
	      },
	      940: {
	        items: 5
	      }
	    },
  	}


}