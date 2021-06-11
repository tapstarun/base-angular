import { Component, Input, OnInit,Inject } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QuizService } from "src/app/services/quiz.service";
import { environment } from "src/environments/environment";
import { PitchComponent } from './pitch/pitch.component';
import * as AOS from 'aos';

@Component({
    selector:'app-result',
    templateUrl:'./result.component.html',
    styleUrls:['./result.component.css']
})
export class ResultComponent implements OnInit{
    @Input() resultPageData:any;
    showBreakDown=false;
    consecutiveDataFromApi:any;
    consucativeData="";
   
    constructor(public dialog: MatDialog,
        private quizService:QuizService
        ) {}

    ngOnInit(){
       this.quizService.getConsutiveData().subscribe((res:{status:boolean,data:any})=>{
           this.consecutiveDataFromApi=res.data;
        });

        AOS.init();
    }
    
    onNavigateUrl(slug:string){
        window.location.href=environment.Url+slug;
    
    }
    /***
     * Code for pitch by pitch sequence 
     */
    openBreakDown(){
        
        this.showBreakDown=true;
        let totalQuestion=this.resultPageData.length;
        let correctQuestion=0;

        this.resultPageData.forEach(element => {
            if(element['ans']){
                correctQuestion++;
            }
        });

        this.resultPageData.correctQuestion=correctQuestion;
        this.resultPageData.totalQuestion=totalQuestion;
        console.log(this.resultPageData);
        const dialogRef = this.dialog.open(PitchComponent,{
            data: this.resultPageData
          });

        dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        });
    }

    refresh(): void {
        window.location.reload();
    }

   
}
