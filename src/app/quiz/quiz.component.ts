import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizStart=false;
  loader=false;
  sliderData={};
  sliderItem={};
  sliderItem1={};
  quizDataReceived:boolean;


  constructor(private quizService:QuizService,private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.quizDataReceived=false;
    this.getQuizSlider();
  }
  
  /***
   * Get Quiz data for slider so we can get the quiz
   */
  getQuizSlider(): any{
    this.loader=true;
   
    let params={
        action:'get_level_data_dev',
        post_id:3879,//1258/
        user_id:477,
        level:3
    };

    this.quizService.getQuizData(params).subscribe((sliderDataAPi:any)=>{
      // this.quizDataReceived=true;
       this.sliderData=sliderDataAPi;
       this.sliderItem=sliderDataAPi.image;
     
      // this.loader=false;
      // this.quizStart=true;
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


    params={
      action:'get_level_data_dev',
      post_id:4160,//4160/
      user_id:477,
      level:3
    };

  this.quizService.getQuizData(params).subscribe((sliderDataAPi:any)=>{
    this.quizDataReceived=true;
    
    this.sliderItem1=sliderDataAPi.image;
     console.log(sliderDataAPi);
    this.loader=false;
    this.quizStart=true;
  });


  }

  startQuiz(index:number):any{ 
    let quizData:any;  
    if(index==0){
       quizData=JSON.stringify(this.sliderItem[index]); 
      
    }else{
       quizData=JSON.stringify(this.sliderItem1[3]);
    }
    localStorage.setItem('quiz', quizData);
    
    this.router.navigate(['quiztemplate'] );
  }

}
