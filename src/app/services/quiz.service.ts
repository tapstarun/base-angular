import { Injectable } from "@angular/core";
import { HttpService } from "./httpservice";


@Injectable({
    providedIn:'root'
})
export class QuizService{

    constructor(private httpService:HttpService){}

    getQuizData=(params:any)=>{
       
        const header={
            'Access-Control-Allow-Origin': '*'
        };
        return this.httpService.getData(params,header);
    }

    getConsutiveData(){
        const params={action:'userConseDaysStoreApi',user_id:477};
        const header={};
        return this.httpService.getData(params,header);
    
    }

    storeQuizData(params){        
         return this.httpService.postData(params,[]);
    }
}