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
  url='https://appliedvisionbaseball.com/';


  constructor(private quizService:QuizService,private router: Router) { }

  ngOnInit(): void {
    this.getQuizSlider();
  }
  /***
   * Get Quiz data for slider so we can get the quiz
   */
  getQuizSlider(): any{
    this.loader=true;
    this.quizService.getQuizData().subscribe(sliderDataAPi=>{
      this.sliderData=sliderDataAPi;
      this.sliderItem=sliderDataAPi['image'];
      console.log( this.sliderItem);
      this.loader=false;
      this.quizStart=true;
     });
  }

  startQuiz(index:number):any{
    console.log(index);
    this.router.navigate(['quiz/start',{id:index} ]);
  }

}
