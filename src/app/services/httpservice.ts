import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {environment} from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class HttpService{
constructor(private http:HttpClient){}

// Method for get request
getData(getParams:any|null,header:any){
   
    let params = new HttpParams();
   
    const headers = new HttpHeaders();
   
    if(Object.keys(getParams).length>0){
       
        Object.keys(getParams).forEach(key => {           

            params=params.append(key,getParams[key]);
        });
    }  
    
    if(Object.keys(header).length>0){
        
        Object.keys(header).forEach(key => {
            headers.set(key,header[key]);
        });
    } 
  
    return this.http.get(environment.API_URL,{headers:headers,params:params}).pipe(catchError(this.handleError));;
}

//Method for Post Request
    postData(getParams:any|null,header:any){
        let headers={};
        if(header){
            headers=header;
        }   
        const header1={
            'Access-Control-Allow-Origin':'*'
        };

        return this.http.get(environment.API_URL,{headers:header1,params:getParams}).pipe(catchError(this.handleError));;
        // return this.http.post(environment.API_URL,[],{headers:header1,params:getParams})
        // .pipe(catchError(this.handleError));
    }

    // only used in this file for now for the error handling
    private handleError(errRes){
            
        let errorMessage="An Error Occured";
        console.log(errRes);
        if(!errRes.status){
            errorMessage= errRes.data.error;
            console.log(errRes);
            return throwError(errorMessage);
        }
        
    }
    // method for put request

    put(url:string,getParams:any,header:any){
        let headers={};
        if(header){
            headers=header;
        }  
        return this.http.put(environment.API_URL,getParams,{headers});
    }

    // method for the patch request
    petch(url:string,getParams:any,header:any){
        let headers={};
        if(header){
            headers=header;
        }  
        return this.http.patch(environment.API_URL,getParams,{headers});
    }
}