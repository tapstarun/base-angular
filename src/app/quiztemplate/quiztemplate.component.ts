import { 
  Component, 
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation, 
  OnDestroy,
  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../services/httpservice';
import { QuizService } from '../services/quiz.service';


@Component({
  selector: 'app-quiztemplate',
  templateUrl: './quiztemplate.component.html',
  styleUrls: ['./quiztemplate.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuiztemplateComponent implements OnInit,OnDestroy  {

  

  @ViewChild('videoPlayer') videoPlayer: ElementRef;
 // quiz:QuizTemplateModel;
  showPlayButton=true;
  videoPlayed=false;
  quizData:any;
  showFirstPage=true;
  showSwing=false;
  swingTemplate=false;
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
  swingButtonWork=true;
  BASE_IMAGE_URL = 'https://content.jwplatform.com/v2/media/';
  BASE_VIDEO_URL = 'https://cdn.jwplayer.com/videos/';
  BASE_HLSVIDEO_URL = 'https://cdn.jwplayer.com/manifests/';
  portateModeImage='/assets/baseball-icons/new-rotate-150x150.png';
  videoData:any;
  showThumbs=false;
  rightThumbs=false;
  ShowVideo=true;
  storeResultArray=[];
  hightlightButtonId:number;
  correctQuestionSound="../../../assets/audio/correct.mp3";
  incorrectQuestionSound="../../../assets/audio/incorrect.mp3";
  progress=this.reactTime;
  responseTime=0;
  responseTImeInterve:any;
  clearIntervalValue=false;
  storeQuizRelatedData:any;
  quizDetails:any;
  ipAddress:string;
  storeResultDataForQuiz:any;
//https://cdn.jwplayer.com/v2/media/gi2pb1VW




constructor(
  private activatedRoute: ActivatedRoute,
  private quizService:QuizService,
  private authService:AuthService,
  private elRef: ElementRef,
  private httpService:HttpService,
  private sanitizer:DomSanitizer,
  ) { 
  this.quizData = {} as any;
  this.currentQuestion = {} as any;
  this.questions = new Array<any>();
  this.storeQuizRelatedData={};
  this.quizDetails={};
  this.getIP();
  this.storeResultDataForQuiz={};
  this.storeResultDataForQuiz.question_ids=[];

}

  ngOnInit(): void {

   this.initFunction();  
   
   // this.result();
  }


  initFunction(){
    
    this.quizData = JSON.parse(localStorage.getItem("quiz"));
    this.quizType = this.quizData.quiz_theme;
    this.quizDetails.quiz_id=this.quizData.quiz_id;
    /***
     * For MP4 video 
     */
    
    this.questions =  this.quizData.question_ids.map(ques=>{            
    this.url=this.BASE_VIDEO_URL+ques.url+"-eqAMKrlW.mp4"; // for mp4 high quality videos
  // this.url=this.BASE_HLSVIDEO_URL+ques.url+".m3u8"; // for hls high quality videos
      return {...ques,url:this.url};
    
    });

    console.log(this.questions); 

     /***
     * start quiz from 1 question
     */

    if(this.questions.length > 0){
     
      this.currentQuestion = this.questions[0];
     
      this.currentQuestion.currentIndex = 0 ; 
      this.currentQuestion.totalQuestion = this.questions.length;
    }

  }

  /****
   * 
   * When Video ended then enable timer and other processs
   */
  videoEnded(events){
 //events.getDefaultMedia().currentTime = 0;
    console.log('video ended');
    this.ShowVideo=false;
    this.currentQuestion.url='';
    
    this.questionDisplay=false;
    this.countResponseTimeFunc();
    this.moveToNextAsPerTemplate(); 
  }

  /***
   * to get the  Quiz Template 
   */

  quizTemplate(quiz:string){
    this.showFirstPage=false;
   
    switch (quiz) {
      case 'theme_swinger':
         this.showSwing=true;
         this.swingTemplate=true;
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

   /****
   * 
   * When click on start button then quiz template excute
   */


  playQuiz():void{
    this.quizDetails.start_time= new Date().toISOString();
    this.quizTemplate(this.quizType);

  }
  /***
   * Get user ip address
   */
   getIP()  
   {  
     this.httpService.getIPAddress().subscribe((res:any)=>{  
       this.ipAddress=res.ip;  
     });  
   }

   /****
   * 
   * react time 
   */

  getReactionTime(){
    if(this.timeOutRunining!=undefined){
        this.reactTime=this.reactTime-1;
        
        this.progressBarUpdate();
      
        if(this.reactTime==0){
          this.responseTime=0;
          this.questionDisplay=true;
          this.swingButtonWork=false;
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
             
            }, setTimeoutTimer);
        }
       
    }
  }

  /****
   * 
   * Response time get 
   */

  countResponseTimeFunc():any{   
    
    if(this.clearIntervalValue){
        clearTimeout(this.responseTImeInterve);       
        return;
    }
    //console.log(this.responseTime);
    
    this.responseTime++;
    this.responseTImeInterve=setTimeout(()=>{ 
      this.countResponseTimeFunc();
    },1);

  }
  /***
   * 
   * Call function as per the quiz template
   */
  moveToNextAsPerTemplate():any{   

    if(this.storeQuizRelatedData.userAnsweredAlready){
      return;
    }

    /***
     * 
     * Call a function for reaction time
     */
    
     let setTimeoutTimer=1000;
     if(this.quizType=='theme_swinger'){
       setTimeoutTimer=500;
     }

     this.timeOutRunining=setTimeout(()=>{             
      console.log('Timer start from here');
      this.getReactionTime();      
    }, setTimeoutTimer);   

  }

 
  /***
   * Once Video Ended
   */
  onVideoEnded(){
    console.log(" onVideoEnded function calling");
  
    //this.videoData.getDefaultMedia().currentTime = 0;
    this.ShowVideo=false;
    this.currentQuestion.url='';   
    this.questionDisplay=false;
    //this.countResponseTimeFunc();
    this.moveToNextAsPerTemplate(); 
  }

  nextQuestion(index:number){
    
    this.disbaledExtraFeatures(); // reset everything for next question
    
    let currentIndexValue=index + 1;  // increase the value everytime
    
    if(currentIndexValue < this.questions.length){
     
      this.currentQuestion = this.questions[currentIndexValue];    
      this.currentQuestion.currentIndex = currentIndexValue;
      this.currentQuestion.totalQuestion = this.questions.length;       
    }else{
      
      this.resultReport();
      this.result();
    }
    

    this.ShowVideo=true;
    this.hightlightButtonId=0; // dont show any button highlighted
  }
  


  /***
   * 
   * Store data for result report 
   */
    resultReport(){

      this.quizDetails.end_time=new Date().toISOString();
      let userData = this.authService.userDetails();

      let quizReport={
        'user_id':userData.userId,
        'user_ip':this.ipAddress,
        'user_name':userData.userName,
        'user_email':userData.userEmail,
        'user_phone':'',
        'quiz_id':this.quizDetails.quiz_id,
        'start_date': this.quizDetails.start_time,
        'end_date': this.quizDetails.end_time,
        'answered':this.storeResultDataForQuiz,
        'action':'post_results'

      };
      console.log(this.storeResultDataForQuiz);
      
      this.quizService.storeQuizData(quizReport);
    }
  

  /****
   * 
   * Disbale extra features earlier video so next video or question go smoothly
   */
  disbaledExtraFeatures(){
      this.showThumbs=false;
      this.responseTime=0;
      this.playButton(true);  
      this.swingButtonWork=true;
      this.progress = 100;
      this.reactTime =this.timer; // Because everytime counter run so it shourld be same as timer
      this.clearIntervalValue=false; // start interval for reaction time every time from the start
      this.questionDisplay=true;  // disable question after every question
      this.storeQuizRelatedData.userAnsweredAlready=false;
  }


  /***
   * 
   * Show result page
   */
  result(){
   
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
    console.log('swing option select');
    this.clearIntervalValue=true;
    this.storeQuizRelatedData.userAnsweredAlready=true; // if user answer already early the timer
    this.swingButtonWork=false;
    this.questionDisplay=true;

   clearTimeout(this.timeOutRunining);

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
      
      
  }


  /***
   * 
   *normalQuizAnswer option selected
   */
   normalQuizAnswer(userAns:number){
    this.storeQuizRelatedData.userAnsweredAlready=true; // if user answer already early the timer
    this.clearIntervalValue=true;
   
    this.questionDisplay=true;
   
      this.accuracy=false;
     
      clearTimeout(this.timeOutRunining);
      if(userAns===this.currentQuestion.correct_answer){
        this.accuracy=true;
      }
      
     
      let storeData={       
        'user_answer':userAns        
      };
      this.storeDataInStats(storeData); // Store the data in db

   }


   showThumb(){
    this.questionDisplay=true;
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
   
    this.hightlightButtonId=this.currentQuestion.correct_answer;

    // showThumbsup and down
       this.showThumb();
       let userData = this.authService.userDetails();

     let data={
      'question_id':this.currentQuestion.id,
      'user_id':userData.userId,
      'correct_ans':this.currentQuestion.correct_answer,
      'user_answer':storeData.user_answer,
      'pitch_type':this.currentQuestion.pitch_type,
      'react_time':this.reactTime,
      'accuracy':this.accuracy,
      'response_time_ms':this.responseTime,
      'action':'statistic_data_api'
     };
     
    
     this.storeResultDataForQuiz.question_ids.push(this.currentQuestion.id);

     let questionId='question_id_'+this.currentQuestion.id;
     let responseCorrectAnswer=this.accuracy?true:false;
     
     this.storeResultDataForQuiz.correctness={...this.storeResultDataForQuiz.correctness,[questionId]:responseCorrectAnswer};

     this.storeResultDataForQuiz.user_answered={...this.storeResultDataForQuiz.user_answered,[questionId]:storeData.user_answer};

     
    
    
    this.storeDataForResultTemplateWise(storeData.user_answer); // Template wise store data 
     
    this.quizService.storeQuizData(data);
     // settimeout for 1 sec so user can see thumbs up or down
     setTimeout(()=>this.nextQuestion(this.currentQuestion.currentIndex),1000);

   }


   storeDataForResultTemplateWise(user_answer){
    let userAnswered={};
    const reactionMS=this.responseTime/1000; // reaction time in milisecond
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
          'ans':this.accuracy,
          'reactionTime':reactionMS
         };

         
        break;

      case 'theme_singlecolumnbutton':
        
        userAnswered={
          'userAns':user_answer==0?'Not Answered':this.getLabelFromQuestionForSingleLine(user_answer),
          'correctAns':this.getLabelFromQuestionForSingleLine(this.currentQuestion.correct_answer),
          'ans':this.accuracy,
          'reactionTime':reactionMS
         };        
        break;

      default:

        userAnswered={
          'userAns':user_answer==0?'Not Answered':this.getLabelFromQuestion(user_answer),
          'correctAns':this.getLabelFromQuestion(this.currentQuestion.correct_answer),
          'ans':this.accuracy,
          'reactionTime':reactionMS
         };        
        break;
    }

    this.storeResultArray.push(userAnswered);
   
    
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

   getLabelFromQuestionForSingleLine(id:number){
    
    let correctAnsLabel:string;
    let answners=this.currentQuestion.answers.answer;       
     Object.keys(answners).forEach(key => {          
      let ansObj=answners[key]; 
      
      if(typeof ansObj == 'object'){  
                     
      
            if(typeof ansObj == 'object'){ 
              
              if(ansObj['id']==id){              
                correctAnsLabel=ansObj['answer'];                 
              }
            }
              
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
  

  progressBarUpdate(){
    //if we don't have progress, set it to 0.
   
    if(!this.reactTime) {
     this.progress = 0;
     }
     
     if(this.reactTime==3) {
      this.progress = 100;
      }
   //if we don't have a total aka no requirement, it's 100%.
  //  if(this.timer === 0) {
  //    this.timer = this.progress;
  //   } else if(!this.timer) {
  //     this.timer = 100;
  //   }
   //if the progress is greater than the total, it's also 100%.
   if(this.reactTime > this.timer) {
     this.progress = 100;
     console.log(this.reactTime);
     console.log(this.timer);
    // this.timer = 100;
   }
   this.progress = (this.reactTime / this.timer) * 100;
   console.log(this.progress);
  }

  playButton(event){
   
    this.showPlayButton=event;
  }
  
  videoDuration(event){  
    console.log('4 second complete for video'); 
    this.questionDisplay=false;
    this.countResponseTimeFunc();
  }

  ngOnDestroy(){
    clearTimeout(this.timeOutRunining);
    clearTimeout(this.responseTImeInterve);
   
  }
}
