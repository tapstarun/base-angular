import { Injectable } from "@angular/core";
import { HttpService } from "./httpservice";


@Injectable({
    providedIn:'root'
})
export class QuizService{

    constructor(private httpService:HttpService){}

    getQuizData=()=>{
        console.log('quiz serviec call');
        const params={
            action:'get_level_data_dev',
            post_id:3879,//1258/
            user_id:477,
            level:3
        };
        const header={
            'Access-Control-Allow-Origin': '*'
        };
        return this.httpService.getData('/api/',params,header);
    }

    getConsutiveData(){
        const params={action:'userConseDaysStoreApi'};
        const header={};
        return this.httpService.postData('api/',params,header);
    
    }

    storeQuizData(params){        
         return this.httpService.postData('api/',params,[]);
    }
}