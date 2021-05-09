import { Injectable } from "@angular/core";
import { HttpService } from "../services/httpservice";

@Injectable({
    providedIn:'root'
})
export class MemberService{
    
    constructor(
        private httpService:HttpService       
        ){}
    
    getMemberPageData(user_id:number){
        const param={
            action:'userMemberPageDataApi',
            user_id:user_id
        };
        return this.httpService.getData(param,[]);
    }

    getCarousel(carposelId:number){
        const param={
            action:'get_carousel',
            id:carposelId
        };
        return this.httpService.postData(param,[]);
    }

    
}