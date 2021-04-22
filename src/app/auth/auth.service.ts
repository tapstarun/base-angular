import { Injectable } from "@angular/core";
import { HttpService } from "../services/httpservice";

interface User{
    email:string;
    password:string;
}
@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private httpService:HttpService){}

    signupForm<User>(data:any){
        let newData={...data,action:'authenticate_user'};
        this.httpService.postData('https://appliedvisionbaseball.com/wp-admin/admin-ajax.php',newData,[]).subscribe(res=>{
            console.log(res);
        });
    }
}