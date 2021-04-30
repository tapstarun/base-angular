import { Component, OnInit,ViewChild,ElementRef,ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { QuizTemplateModel } from './quiztemplate-model';
import {ProgressBarMode} from '@angular/material/progress-bar';


@Component({
  selector: 'app-quiztemplate',
  templateUrl: './quiztemplate.component.html',
  styleUrls: ['./quiztemplate.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuiztemplateComponent implements OnInit  {
  
  value=50;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
 // quiz:QuizTemplateModel;
  videoPlayed=false;
  quizData:any;
  showFirstPage=true;
  showSwing=false;
  showNormalQuiz=false;
  showSingleLineQuiz=false;
  resultPage=false;
  questions:any[];
  currentQuestion:any;
  url:string;
  quizType:string;
  accuracy:boolean;
  timer=3;
  reactTime=3;
  timeOutRunining:any;
  questionDisplay=true;
  BASE_IMAGE_URL = 'https://content.jwplatform.com/v2/media/';
  BASE_VIDEO_URL = 'https://cdn.jwplayer.com/videos/';
  portateModeImage='/assets/baseball-icons/new-rotate-150x150.png';
  videoData:any;
  showThumbs=false;
  rightThumbs=false;
  ShowVideo=true;
  storeResultArray=[];
  hightlightButtonId:number;
  correctQuestionSound="../../../assets/audio/correct.mp3";
  incorrectQuestionSound="../../../assets/audio/incorrect.mp3";
  
//https://cdn.jwplayer.com/v2/media/gi2pb1VW
  

constructor(private activatedRoute: ActivatedRoute,private quizService:QuizService) { 
    this.quizData = {} as any;
    this.currentQuestion = {} as any;
    this.questions = new Array<any>();
    
  }

  

  ngOnInit(): void {
    
    console.log(" ngOnInit function calling");
    this.quizData = JSON.parse(localStorage.getItem("quiz"));
    this.quizType = this.quizData.quiz_theme;
    this.questions =  this.quizData.question_ids.map(ques=>{      
      this.url=this.BASE_VIDEO_URL+ques.url+"-eqAMKrlW.mp4"; // for high quality videos
      return {...ques,url:this.url};
    });

    console.log(this.questions);

    if(this.questions.length > 0){
     
      this.currentQuestion = this.questions[0];
     
      this.currentQuestion.currentIndex = 0 ; 
      this.currentQuestion.totalQuestion = this.questions.length;
    }
   
   // this.result();
  }


  videoEnded(events){

    console.log(" onVideoEnded function calling");    
    //events.getDefaultMedia().currentTime = 0;

    this.ShowVideo=false;
    this.currentQuestion.url='';
    
    console.log(events);
    this.questionDisplay=false;
    
    this.moveToNextAsPerTemplate(); 
  }
  /***
   * Call Quiz Template 
   */
  quizTemplate(quiz:string){
    this.showFirstPage=false;
   
    switch (quiz) {
      case 'theme_swinger':
         this.showSwing=true;
        break;
      case 'theme_baseball':
        this.showNormalQuiz=true;
          break;

      case 'theme_singlecolumnbutton':
        this.showSingleLineQuiz=true;
          break;
          
      default:
        this.showNormalQuiz=true;
        break;
    }

  }

  playQuiz():void{
    
    this.quizTemplate(this.quizType);

  }
  
  getReactionTime(){
        
    if(this.timeOutRunining!=undefined){
        this.reactTime=this.reactTime-1;
         // console.log(this.reactTime);
        if(this.reactTime==0){
          clearTimeout(this.timeOutRunining);
          this.accuracy=false; // If timeout then accuracy fail;
          let storeData={       
            'user_answer':0        
          };
          // // Store the data in db
          switch (this.quizType) {

            case 'theme_swinger':
              this.optionSelect(false);// Pass argu false because none of the person select the value
              break;
            case 'theme_baseball':
                this.storeDataInStats(storeData);
                break;
      
            case 'theme_singlecolumnbutton':
                this.storeDataInStats(storeData);
                break;
                
            default:
              this.storeDataInStats(storeData);
              break;
          }


        }else{
          let setTimeoutTimer=1000;
          if(this.quizType=='theme_swinger'){
            setTimeoutTimer=500;
          }
          this.timeOutRunining=setTimeout(()=>{             
              this.getReactionTime();
              console.log('else timeout');
            }, setTimeoutTimer);
        }
        console.log('timer finished');
    }
  }

  /***
   * 
   * Call function as per the quiz template
   */
  moveToNextAsPerTemplate():any{
    console.log(" moveToNextAsPerTemplate function calling");
    /***
     * 
     * Call a function for reaction time
     */
    
     let setTimeoutTimer=1000;
     if(this.quizType=='theme_swinger'){
       setTimeoutTimer=500;
     }

     this.timeOutRunining=setTimeout(()=>{             
      this.getReactionTime();
      console.log('first timeout');
    }, setTimeoutTimer);   

  }

    /****
   * Video control from here
   */
  // toggleVideo(event:any){
  
  //   if(!this.videoPlayed){
  //     this.videoPlayed=true;
  //     this.videoPlayer.nativeElement?.play();
  //   }    

  // }

  onVideoEnded(){
    console.log(" onVideoEnded function calling");
    console.log(this.currentQuestion);
    //this.videoData.getDefaultMedia().currentTime = 0;
    this.ShowVideo=false;
    this.currentQuestion.url='';
    
    console.log(this.videoData);
    this.questionDisplay=false;
    
    this.moveToNextAsPerTemplate(); 
  }

  nextQuestion(index:number){
    console.log(" nextQuestion function calling");
    this.showThumbs=false;
    console.log(index); 
    
    this.reactTime =this.timer; // Because everytime counter run so it shourld be same as timer

    this.questionDisplay=true;
    
    let currentIndexValue=index + 1;  // increase the value everytime
    
    if(currentIndexValue < this.questions.length){
     
      this.currentQuestion = this.questions[currentIndexValue];    
      this.currentQuestion.currentIndex = currentIndexValue;
      this.currentQuestion.totalQuestion = this.questions.length;       
    }else{
     // console.log('Go to Result page ');
      //this.currentQuestion = {};
      this.result();
    }
    

    this.ShowVideo=true;
    this.hightlightButtonId=0; // dont show any button highlighted
  }
 
  result(){
    console.log(" result function calling");
    this.showFirstPage=false;
    this.showSwing=false;
    this.showNormalQuiz=false;
    this.showSingleLineQuiz=false;
    this.resultPage=true;
  }

 


  /***
   * When Swing option selected
   */
  optionSelect(selected:boolean){
   // clearTimeout(this.timeOutRunining);
    let correctAnswer:string;
    let userAns:string;
    let answners=this.currentQuestion.answers[0];
    let checkUser:string;        
    Object.keys(answners).forEach(key => {          
      let ansObj=answners[key];  
      if(typeof ansObj == 'object'){             
        if (ansObj['correct'] == 1) {
           userAns=ansObj['id'];   
           correctAnswer=ansObj['answer'];          
        }
      }
    });
    
      if(selected){
        // If in case user select the options
        console.log(correctAnswer,selected);
        this.accuracy = false; // If in case answer incorrect
        if(correctAnswer=='Yes'){         
          this.accuracy = true;
          checkUser=userAns;
        }
      
      }else{ 
        // If in case timeout

        this.accuracy = false; // If in case answer incorrect
        if(correctAnswer=='No'){         
          this.accuracy = true;
        }

      }

      let storeData={        
        'user_answer':checkUser,
        
      };

      this.storeDataInStats(storeData); // Store the data in db
      
      console.log(this.accuracy);
  }


  /***
   * 
   *normalQuizAnswer option selected
   */
   normalQuizAnswer(userAns:number){

    console.log(" normalQuizAnswer function calling");
      this.accuracy=false;
      console.log(this.timeOutRunining);
      clearTimeout(this.timeOutRunining);
      if(userAns===this.currentQuestion.correct_answer){
        this.accuracy=true;
      }
      
      console.log("when user click "+this.accuracy);
      let storeData={       
        'user_answer':userAns        
      };
      this.storeDataInStats(storeData); // Store the data in db

   }


   showThumb(){
    console.log(" showThumb function calling");
    if(this.accuracy){
      this.rightThumbs=true;
      this.playAudio(this.correctQuestionSound);
    }else{
        this.rightThumbs=false;
        this.playAudio(this.incorrectQuestionSound);
    }
     this.showThumbs=true;
   }


   /*****
    * Store Data in DB 
    */
   storeDataInStats(storeData:any){
    console.log(" storeDataInStats function calling");
    this.hightlightButtonId=this.currentQuestion.correct_answer;

    // showThumbsup and down
       this.showThumb();
    

     let data={
      'question_id':this.currentQuestion.id,
      'user_id':477,
      'correct_ans':this.currentQuestion.correct_answer,
      'user_answer':storeData.user_answer,
      'pitch_type':this.currentQuestion.pitch_type,
      'react_time':this.reactTime,
      'accuracy':this.accuracy,
      'action':'statistic_data'
     };
    
     
    this.storeDataForResultTemplateWise(storeData.user_answer); // Template wise store data 
     
    this.quizService.storeQuizData(data);
     // settimeout for 1 sec so user can see thumbs up or down
     setTimeout(()=>this.nextQuestion(this.currentQuestion.currentIndex),1000);

   }


   storeDataForResultTemplateWise(user_answer){
    let userAnswered={};
    
    switch (this.quizType) {

      case 'theme_swinger':
        
        let currCorrectQues= this.getLabelFromQuestion(this.currentQuestion.correct_answer).split('-');
        
        let userAns:string;
        if(currCorrectQues[1]=="No"){
          userAns=this.accuracy?'Didnt Swing':'YOU SWUNG';
        }else{
          userAns=this.accuracy?'YOU SWUNG':'Didnt Swing';
        }

        userAnswered={
          'userAns':userAns,
          'correctAns':this.getLabelFromQuestion(this.currentQuestion.correct_answer),
          'ans':this.accuracy
         };

         
        break;

      default:

        userAnswered={
          'userAns':this.getLabelFromQuestion(user_answer),
          'correctAns':this.getLabelFromQuestion(this.currentQuestion.correct_answer),
          'ans':this.accuracy
         };        
        break;
    }

    this.storeResultArray.push(userAnswered);
    console.log(this.storeResultArray);
    
   }

   /***
    * Get Label of question by id so you can show in pitch by pitch sequese
    */
   getLabelFromQuestion(id:number){
    
    let correctAnsLabel:string;
    let answners=this.currentQuestion.answers;       
     Object.keys(answners).forEach(key => {          
      let ansObj=answners[key];  
      if(typeof ansObj == 'object'){  
                     
        Object.keys(ansObj).forEach(k => { 
            if(typeof ansObj == 'object'){ 
             
              if(ansObj[k]['id']==id){              
                correctAnsLabel=ansObj['label']+'-'+ansObj[k]['answer'];                 
              }
            }
          })        
      }
    });

    
    return correctAnsLabel;   
   }
  
   playAudio(src:string){
    let audio = new Audio();
    audio.src =src; 
    audio.load();
    audio.play();
  }
  

}
