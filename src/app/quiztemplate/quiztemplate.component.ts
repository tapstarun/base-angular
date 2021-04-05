import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-quiztemplate',
  templateUrl: './quiztemplate.component.html',
  styleUrls: ['./quiztemplate.component.css']
})
export class QuiztemplateComponent implements OnInit {
  

  quizData:any;
  showFirstPage=true;
  questions:any[];
  currentQuestion:any;

  constructor(private activatedRoute: ActivatedRoute) { 
    this.quizData = {} as any;
    this.currentQuestion = {} as any;
    this.questions = new Array<any>();
  }

  ngOnInit(): void {
    this.quizData = JSON.parse(localStorage.getItem("quiz"));
    console.log(this.quizData);
         this.questions =  this.quizData.question_ids;
//      this.questions =  this.quizData.question_ids.map((element,index)=>{
//        this.ques

// return element;
//      });
    if(this.questions.length > 0){
      // this.questions[0].isCurrentQuestion = true;
      this.currentQuestion = this.questions[0];
      this.currentQuestion.currentIndex = 0;
    }
    
    console.log(this.questions);
  }

  playQuiz():void{
    this.showFirstPage=false;
  }

  nextQuestion(index:number){
    console.log(index);
    this.currentQuestion.currentIndex = index + 1;
    this.currentQuestion = this.questions[this.currentQuestion.currentIndex];
  }
}
