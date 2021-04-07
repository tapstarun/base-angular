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
  showSwing=false;
  showNormalQuiz=false;
  showSingleLineQuiz=false;
  resultPage=false;
  questions:any[];
  currentQuestion:any;
  BASE_IMAGE_URL = 'https://content.jwplatform.com/v2/media/';
  BASE_VIDEO_URL = 'https://content.jwplatform.com/manifests/';

  constructor(private activatedRoute: ActivatedRoute) { 
    this.quizData = {} as any;
    this.currentQuestion = {} as any;
    this.questions = new Array<any>();
  }

  ngOnInit(): void {
    this.quizData = JSON.parse(localStorage.getItem("quiz"));
    this.questions =  this.quizData.question_ids;

    console.log(this.quizData.question_ids);

    if(this.questions.length > 0){
     
      this.currentQuestion = this.questions[0];
     
      this.currentQuestion.currentIndex = 0;
    }
    
    console.log(this.questions);
  }

  playQuiz():void{
    this.showFirstPage=false;
    this.showNormalQuiz=false;
    this.showSingleLineQuiz=true;
  }

  nextQuestion(index:number){
    console.log(index);
    let currentIndexValue=index + 1;  // increase the value everytime

    if(currentIndexValue < this.questions.length){
     
      this.currentQuestion = this.questions[currentIndexValue];
      this.currentQuestion.currentIndex = currentIndexValue;

    }else {

      console.log(this.currentQuestion);

    }
  }

  result(){
    
    this.resultPage=true;
  }
}
