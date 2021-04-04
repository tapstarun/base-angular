import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class QuizService{

    constructor(private http:HttpClient){}

    getQuizData=()=>{
        console.log('quiz serviec call');
        // const params={
        //     action:'get_level_data_dev',
        //     post_id:3879,
        //     user_id:477,
        //     level:3
        // };
        
        return this.http.get('api/?action=get_level_data_dev&post_id=3879&user_id=477');
    }
}