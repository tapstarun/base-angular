import { Injectable } from "@angular/core";
import { HttpService } from "../services/httpservice";
import {  tap } from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import { AuthModel } from "./auth.model";
import { Router } from "@angular/router";


@Injectable({
    providedIn:'root'
})
export class AuthService{
   user = new BehaviorSubject<AuthModel>(null);
    loggoutTimer:any;
    constructor(private httpService:HttpService,private router:Router){}

    login(data:any){
        let newData={...data,action:'authenticate_user'};

        const header={
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods': "POST,GET,OPTIONS, PUT, DELETE",
            "Access-Control-Allow-Headers": "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization" 
        };

        return this.httpService.postData(newData,[])
        .pipe(           
            tap((resData:any)=>{
               console.log('tap');
               const expireToken=3600000;
                const expirationDate=new Date(new Date().getTime() + expireToken);

               const user= new AuthModel(
                   resData.data.auth_token,
                   expirationDate,
                   resData.data.userEmail,
                   resData.data.user_id,
                   resData.data.user_name,
                   resData.level
                );
                localStorage.setItem('userData',JSON.stringify(user));
                this.user.next(user);
                // Function for autologout
                this.autoLogout(expireToken);
            }
        ));
    }

    // check user already loggedin or not
    autoLogin(){
        const userData: {
            authToken:string;
            tokenExpirationDate:string;
            userEmail:string;
            userId:number;
            userName:string;
            level:number;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return ;
        }

        const loadedUser= new AuthModel(
            userData.authToken,
            new Date(userData.tokenExpirationDate),
            userData.userEmail,
            userData.userId,
            userData.userName,
            userData.level
         ); 
        
         if(loadedUser.token){
            let getRemainingTimingTokenExpire=
            new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
            this.user.next(loadedUser);
            this.autoLogout(getRemainingTimingTokenExpire);
         }
    }

    logout(){
        this.user.next(null);
        //this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        // cleartimeout if you logout manually.
        if(this.loggoutTimer){
            clearTimeout(this.loggoutTimer);
        }
        this.loggoutTimer=null;
        console.log('logout');
        this.router.navigate(['/auth']);
    }

    autoLogout(expiredIn:number){
        this.loggoutTimer=setTimeout(()=>
        {
            this.logout();

        },expiredIn);
    }

    
}