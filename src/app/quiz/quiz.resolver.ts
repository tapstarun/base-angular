import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class QuizResolver implements Resolve<any>{

        constructor(private authService:AuthService){}
        resolve(route:ActivatedRouteSnapshot,rstate:RouterStateSnapshot): Observable<any>|Promise<any>|any{
            console.log('resolver Works');
            const token=route.paramMap.get('user');
            this.authService.getUserDetails(token);
            
            return this.authService.userDetails();
          
        }
}