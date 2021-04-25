import { Injectable } from "@angular/core";
import { HttpService } from "../services/httpservice";
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { AuthModel } from "./auth.model";


@Injectable({
    providedIn:'root'
})
export class AuthService{
   user = new BehaviorSubject<AuthModel>(null);

    constructor(private httpService:HttpService){}

    login(data:any){
        let newData={...data,action:'authenticate_user'};

        const header={'Access-Control-Allow-Origin':'*'};

        return this.httpService.postData('/api',newData,{Headers:header})
        .pipe(
            catchError(this.handleError),
            tap(resData=>{
               
                const expirationDate=new Date(new Date().getTime() + 100000);

               const user= new AuthModel(
                   resData['data'].auth_token,
                   expirationDate,
                   resData['data'].userEmail,
                   resData['data'].user_id,
                   resData['data'].user_name
                );
                this.user.next(user);
            }
        ));
    }

    // only used in this file for now for the error handling
    private handleError(errRes){
        
        let errorMessage="An Error Occured";
        
        if(!errRes.status){
            errorMessage= errRes.data.error;
            console.log(errRes);
            return throwError(errorMessage);
        }
        
    }
}