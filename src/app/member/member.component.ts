import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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