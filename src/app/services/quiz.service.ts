import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { HttpService } from "./httpservice";


@Injectable({
    providedIn:'root'
})
export class QuizService{

    constructor(private httpService:HttpService,private authService:AuthService){}

    getQuizData=(params:any)=>{
       
        const header={
            'Access-Control-Allow-Origin': '*'
        };
        return this.httpService.getData(params,header);
    }

    getConsutiveData(){
        let userData = this.authService.userDetails();
        const params={action:'userConseDaysStoreApi',user_id:userData.userId};
        const header={};
        return this.httpService.getData(params,header);
    
    }

    storeQuizData(params){        
         return this.httpService.postData(params,[]);
    }
}