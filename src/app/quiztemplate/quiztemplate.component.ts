import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-quiztemplate',
  templateUrl: './quiztemplate.component.html',
  styleUrls: ['./quiztemplate.component.css']
})
export class QuiztemplateComponent implements OnInit  {
  
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  
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
  quiz_Type:string;
  accuracy:boolean;
  timer=3;
  react_time=3;
  timeOutRunining:any;
  questionDisplay=true;
  BASE_IMAGE_URL = 'https://content.jwplatform.com/v2/media/';
  BASE_VIDEO_URL = 'https://cdn.jwplayer.com/videos/';
  videoData:any;
  showThumbs=false;
  rightThumbs=false;
  ShowVideo=true;
  storeResultArray=[];
//https://cdn.jwplayer.com/v2/media/gi2pb1VW
  

constructor(private activatedRoute: ActivatedRoute) { 
    this.quizData = {} as any;
    this.currentQuestion = {} as any;
    this.questions = new Array<any>();
    
  }

  

  ngOnInit(): void {
    this.quizData = JSON.parse(localStorage.getItem("quiz"));
    this.quiz_Type = this.quizData.quiz_theme;
    this.questions =  this.quizData.question_ids.map(ques=>{      
      this.url=this.BASE_VIDEO_URL+ques.url+"-eqAMKrlW.mp4"; // for high quality videos
      return {...ques,url:this.url};
    });

    console.log(this.questions);

    if(this.questions.length > 0){
     
      this.currentQuestion = this.questions[0];
     
      this.currentQuestion.currentIndex = 0;
      this.currentQuestion.totalQuestion = this.questions.length;
    }
    
    
  }


  videoPlayerInit(data) {
    this.videoData = data;

   // this.videoData.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.videoData.getDefaultMedia().subscriptions.ended.subscribe(this.onVideoEnded.bind(this));
    this.videoData.getDefaultMedia().subscriptions.pause.subscribe(this.initVdo.bind(this));
  }

  

  initVdo() {
    console.log("video pause");
    this.videoData.play();
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
    
    this.quizTemplate(this.quiz_Type);

  }
  
  getReactionTime(){
    console.log(this.timeOutRunining);
    
    if(this.timeOutRunining!=undefined){
        this.react_time=this.react_time-1;
          console.log(this.react_time);
        if(this.react_time==0){
          clearTimeout(this.timeOutRunining);
          
          let storeData={       
            'user_answer':0        
          };
          // // Store the data in db
          switch (this.quiz_Type) {

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
          this.timeOutRunining=setTimeout(()=>{             
              this.getReactionTime();
              console.log('else timeout');
            }, 1000);
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
     this.timeOutRunining=setTimeout(()=>{             
      this.getReactionTime();
      console.log('first timeout');
    }, 1000);    
  }

    /****
   * Video control from here
   */
  toggleVideo(event:any){
  
    if(!this.videoPlayed){
      this.videoPlayed=true;
      this.videoPlayer.nativeElement?.play();
    }    

  }

  onVideoEnded(){
    this.ShowVideo=false;
    console.log("video end ");
    //this.videoData.pause();
    console.log(this.videoData);
    this.questionDisplay=false;
    console.log("questionDisplay "+this.questionDisplay);
    this.moveToNextAsPerTemplate(); 
  }

  nextQuestion(index:number){
    this.showThumbs=false;
    console.log(index); 
    
    this.react_time =this.timer; // Because everytime counter run so it shourld be same as timer

    this.questionDisplay=true;
    console.log("questionDisplay "+this.questionDisplay);
    let currentIndexValue=index + 1;  // increase the value everytime

    if(currentIndexValue < this.questions.length){
     
      this.currentQuestion = this.questions[currentIndexValue];
      this.currentQuestion.currentIndex = currentIndexValue;
      this.currentQuestion.totalQuestion = this.questions.length;     
    }
    this.ShowVideo=true;
  }

  result(){
    
    this.resultPage=true;
  }

  findDataInQuestionObject(answners,type){
    let correctAnswerValue:string;
    
    return false;
  }


  /***
   * When Swing option selected
   */
  optionSelect(selected:boolean){
   // clearTimeout(this.timeOutRunining);
    let correctAnswer:string;
    let userAns:string;
    let answners=this.currentQuestion.answers[0];        
    Object.keys(answners).forEach(key => {          
      let ansObj=answners[key];  
      if(typeof ansObj == 'object'){             
        if (ansObj['correct'] == 1) {
           correctAnswer=ansObj['answer'];          
        }
      }
    });
    //let correctAnswer=this.findDataInQuestionObject(answners,'answer');
      if(selected){
        // If in case user select the options

        this.accuracy = false; // If in case answer incorrect
        if(correctAnswer=='Yes'){         
          this.accuracy = true;
        }
      
      }else{ 
        // If in case timeout

        this.accuracy = false; // If in case answer incorrect
        if(correctAnswer=='No'){         
          this.accuracy = true;
        }

      }

      let storeData={        
        'user_answer':userAns,
        
      };

      this.storeDataInStats(storeData); // Store the data in db
      
      console.log(this.accuracy);
  }


  /***
   * 
   *normalQuizAnswer option selected
   */
   normalQuizAnswer(userAns:number){
      this.accuracy=false;
      console.log(this.timeOutRunining);
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
    if(this.accuracy){
      this.rightThumbs=true;
    }else{
        this.rightThumbs=false;
    }
     this.showThumbs=true;
   }

   storeDataInStats(storeData:any){

    // showThumbsup and down
       this.showThumb();
    

     let data={
      'question_id':this.currentQuestion.id,
      'user_id':477,
      'correct_ans':this.currentQuestion.correct_answer,
      'user_answer':storeData.user_answer,
      'pitch_type':this.currentQuestion.pitch_type,
      'react_time':this.react_time,
      'accuracy':this.accuracy,
      'action':'statistic_data'
     };
    

     let userAnswered={
      'userAns':this.getLabelFromQuestion(storeData.user_answer),
      'correctAns':this.getLabelFromQuestion(this.currentQuestion.correct_answer),
      'ans':this.accuracy
     };
     this.storeResultArray.push(userAnswered);

     //storeResultArray[]=
     console.log(data);
     console.log('user option sected');
     console.log(this.storeResultArray);
     // settimeout for 1 sec so user can see thumbs up or down
     setTimeout(()=>this.nextQuestion(this.currentQuestion.currentIndex),1000);
   }

   getLabelFromQuestion(id:number){
    let correctAnsLabel:string;
    let answners=this.currentQuestion.answers;       
     Object.keys(answners).forEach(key => {          
      let ansObj=answners[key];  
      if(typeof ansObj == 'object'){                  
        Object.keys(ansObj).forEach(k => { 
            if(typeof ansObj == 'object'){ 
             
              if(ansObj[k]['id']==id){                
                console.log(ansObj[k]['answer']);
                correctAnsLabel=ansObj[k]['answer'];
              }
            }
          })        
      }
    });
    return correctAnsLabel;   
   }
  
  

}
