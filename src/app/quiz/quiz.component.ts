import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { QuizService } from '../services/quiz.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizStart=false;
  loader=false;
  sliderData:any;
  sliderItem={};
  sliderItem1={};
  quizDataReceived:boolean;
  quizSlug:string;
  url=environment.Url;
  constructor(  
    private quizService:QuizService,
    private router: Router,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.quizSlug=this.route.snapshot.paramMap.get('slug');

    this.quizDataReceived=false;
    this.getQuizSlider();
  }
  

  quizSliderOption: any = {
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


  /***
   * Get Quiz data for slider so we can get the quiz
   */
  getQuizSlider(): any{
    this.loader=true;
   
    let params={
        action:'get_level_data_dev',
        slug:this.quizSlug,//1258/
        user_id:477       
    };

    this.quizService.getQuizData(params).subscribe((sliderDataAPi:any)=>{
      console.log(sliderDataAPi);
      
       this.quizDataReceived=true;
       this.sliderData=sliderDataAPi;
       this.sliderItem=sliderDataAPi.image;
     
     
       this.loader=false;
       this.quizStart=true;
     });

    //   params={
    //     action:'get_level_data_dev',
    //     post_id:1258,//3879/
    //     user_id:477,
    //     level:3
    //   };

    // this.quizService.getQuizData(params).subscribe((sliderDataAPi:any)=>{
    //   this.quizDataReceived=true;
      
    //   this.sliderItem1=sliderDataAPi.image;
       
    //   this.loader=false;
    //   this.quizStart=true;
    // });


  //   params={
  //     action:'get_level_data_dev',
  //     post_id:4160,//4160/
  //     user_id:477,
  //     level:3
  //   };

  // this.quizService.getQuizData(params).subscribe((sliderDataAPi:any)=>{
  //   this.quizDataReceived=true;
    
  //   this.sliderItem1=sliderDataAPi.image;
  //    console.log(sliderDataAPi);
  //   this.loader=false;
  //   this.quizStart=true;
  // });


  }

  startQuiz(index:number):any{         
    let quizData:any;  
    quizData=JSON.stringify(this.sliderItem[index]); 
    localStorage.setItem('quiz', quizData);
    
    this.router.navigate(['quiztemplate'] );
  }

}
