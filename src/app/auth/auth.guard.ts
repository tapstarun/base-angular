import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map,tap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment"; 
@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService, private router:Router){}
    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): boolean | Promise<boolean> | Observable<boolean>{
        return this.authService.user.pipe(take(1),map(user=>{
                if(user==null){
                    return false;
                 }else if(user.level==0){
                    this.router.navigate(["/"]).then(result=>{window.location.href = environment.Url+"/upgrade-plan";});
                    return false;
                }else{
                    // return true;// Just bypass for now
                    return !!user;
                }      
           
        }),tap(isAuth=>{
            console.log(isAuth);
            
           // isAuth=true;
            if(!isAuth){
                console.log('auth');
                this.router.navigate(['/auth']);
                console.log('auth');
            }
        }))
    }
}