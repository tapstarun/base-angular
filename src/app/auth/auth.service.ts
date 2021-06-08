import { Injectable } from "@angular/core";
import { HttpService } from "../services/httpservice";
import {  tap } from 'rxjs/operators';
import { BehaviorSubject, Observable} from 'rxjs';
import { AuthModel } from "./auth.model";
import { Router } from "@angular/router";
import { ContentObserver } from "@angular/cdk/observers";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn:'root'
})
export class AuthService{
   user = new BehaviorSubject<AuthModel>(null);
    loggoutTimer:any;
    constructor(private httpService:HttpService,private router:Router){}

    login(data:any){
        let newData={...data,action:'authenticate_user'};
        return this.httpService.getData(newData,[])
        .pipe(           
            tap((resData:any)=>{
               console.log('tap');
               const expireToken=3600000;
                const expirationDate=new Date(new Date().getTime() + expireToken);

               const user= new AuthModel(
                   resData.data.auth_token,
                   expirationDate,
                   resData.data.user_email,
                   resData.data.user_id,
                   resData.data.user_name,
                   resData.level,
                   resData.data.display_name,
                   resData.data.first_name,
                   resData.data.last_name,
                   resData.data.profile_image,
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
            displayName:string;
            firstName:string;
            lastName:string;
            profileImage:string;
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
            userData.level,
            userData.displayName,
            userData.firstName,
            userData.lastName,
            userData.profileImage,
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
        window.location.href=environment.Url+'/member-area';
        //this.router.navigate(['/auth']);
    }

    autoLogout(expiredIn:number){
        this.loggoutTimer=setTimeout(()=>
        {
            this.logout();

        },expiredIn);
    }

    userDetails(){
        return JSON.parse(localStorage.getItem('userData'));	
    }
    
     // Returns an observable
    upload(file):Observable<any> {
    
        // Create form data
        const formData = new FormData(); 
        
        // Store form name as "file" with file data
        formData.append("file", file, file.name);
        formData.append("action", 'upload_image');
        
        // Make http post request over api
        // with formData as req
        
        return this.httpService.postDataForFile(formData,[]);
    }

    getUserDetails(token:string){
       
        
        return this.httpService.getData({user:token,action:'getUserDetailsViaToken'},[]).subscribe((resData:any)=>{
            if(!resData.status){
                window.location.href=environment.Url+'/member-area';
            }
            const expireToken=3600000;
            const expirationDate=new Date(new Date().getTime() + expireToken);
            const user= new AuthModel(
                resData.data.auth_token,
                expirationDate,
                resData.data.user_email,
                resData.data.user_id,
                resData.data.user_name,
                resData.level,
                resData.data.display_name,
                resData.data.first_name,
                resData.data.last_name,
                resData.data.profile_image,
             );
             
             localStorage.setItem('userData',JSON.stringify(user));
             this.user.next(user);
        });
    }
}