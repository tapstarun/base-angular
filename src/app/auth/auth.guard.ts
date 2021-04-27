import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map,tap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

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
            return true;// Just bypass for now
            return !!user;
        }),tap(isAuth=>{
            isAuth=true;
            if(!isAuth){
                this.router.navigate(['/auth']);
            }
        }))
    }
}