import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

import { MemberService } from './member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  showMemberPage:boolean;
  memberPageData:any;
  videoUrl:any;
  mainTab:any;
  tutorialTab:any;
  hitDrillTab:any;
  mostPopularTab:any;
  swingTab:any;
  url=environment.Url;
  constructor(
	  private memberService:MemberService,
	  private sanitizer:DomSanitizer,
	  private router:Router,
	  private route:ActivatedRoute
	) { 
	  this.showMemberPage=false;
	 
  	}

  ngOnInit(): void {
	this.memberPageSetting();
	}

  memberPageSetting(){

	this.memberService.getMemberPageData(477).subscribe((res:any)=>{
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
		 
		 this.memberService.getCarousel(1224).subscribe((carousel:any)=>{
			this.mostPopularTab= carousel;
			console.log(this.mostPopularTab);
		})

		
		// 3687 Swing Trigger Drills [Popular] 
		

		this.memberService.getCarousel(3687).subscribe((carousel:any)=>{
			this.swingTab= carousel;
		})
	});

	
  }


 playQuiz(quizId:string){
	this.router.navigate(['quiz',quizId]);
 }

  customOptions: any = {
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


  tutorials_slider: any = {
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
        items: 4
      }
    },
  }


//==========================================================
  	pitchers_slider: any = {
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
	        items: 4
	      }
	    },
  	}
//===================================================
  
    	swing_trigger_slider: any = {
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
	        items: 4
	      }
	    },
  	}
//===================================================
    
    	pro_level_slider: any = {
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
	        items: 5
	      }
	    },
  	}
//===================================================

college_slider: any = {
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
	        items: 5
	      }
	    },
  	}
//===================================================

youth_level_slider: any = {
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
	        items: 5
	      }
	    },
  	}
//===================================================

recognition_training_slider: any = {
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
	        items: 4
	      }
	    },
  	}
//===================================================
hitting_drills_slider: any = {
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
//===================================================
}