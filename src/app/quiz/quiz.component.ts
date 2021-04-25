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
    this.quizService.getQuizData().subscribe(sliderDataAPi=>{
      this.quizDataReceived=true;
      this.sliderData=sliderDataAPi;
      this.sliderItem=sliderDataAPi['image'];
       console.log(this.sliderData);   
      this.loader=false;
      this.quizStart=true;
     });
  }

  startQuiz(index:number):any{   
    let quizData=JSON.stringify(this.sliderItem[index]); 
    localStorage.setItem('quiz', quizData);
    
    this.router.navigate(['quiztemplate'] );
  }

}
