import { HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap,take } from "rxjs/operators";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthIntercetorService implements HttpInterceptor{
    constructor(private authService:AuthService){}
    
    intercept(req: HttpRequest<any>,next: HttpHandler){
       
        return this.authService.user.pipe(take(1),exhaustMap(User=>{
            if(User!=null){
                console.log('interceptor '+User.token);
                const modifiedHeader=req.clone(
                 {headers:new HttpHeaders().set('auth',User.token)}
                //{params:new HttpParams().set('auth',User.token)}
                );
                console.log(modifiedHeader);
           }
       
            return next.handle(req);
        }));
    }
   
}