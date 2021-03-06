import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { QuizService } from '../services/quiz.service';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

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
  showloader:boolean;
  token:string;
  constructor(  
    private quizService:QuizService,
    private router: Router,
    private route:ActivatedRoute,
    private authService:AuthService,
    
    ) {
      this.showloader=true;      

    }

  ngOnInit(): void {
    this.quizSlug=this.route.snapshot.paramMap.get('slug');
    
    this.quizDataReceived=false;

    this.getQuizSlider();
  }
  

  fourInARowSlider = {"slidesToShow":3 , "slidesToScroll": 3,responsive: [
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



  /***
   * Get Quiz data for slider so we can get the quiz
   */
  getQuizSlider(): any{
    this.loader=true;
   const user=this.authService.userDetails();

   if(user==null){
    console.log('quiz slider after page load');
     
      // window.location.href=environment.Url+'/member-area';
      // return;
    }

    let params={
        action:'get_level_data_dev',
        slug:this.quizSlug,//1258/
        user_id:user.userId    
    };

    this.quizService.getQuizData(params).subscribe((sliderDataAPi:any)=>{
      
      console.log(sliderDataAPi);
      
       this.quizDataReceived=true;
       this.sliderData=sliderDataAPi;
       this.sliderItem=sliderDataAPi.image;
     
     
       this.loader=false;
       this.quizStart=true;
       this.showloader=false;
     });
    


  }

  startQuiz(index:number):any{         
    let quizData:any;  
    quizData=JSON.stringify(this.sliderItem[index]); 
    localStorage.setItem('quiz', quizData);
    
    this.router.navigate(['quiztemplate'] );
  }

}
