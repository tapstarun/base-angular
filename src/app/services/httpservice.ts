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

getIPAddress(){

    return this.http.get('https://api.ipify.org/?format=json');
}
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

getExternalData(url:string,getParams:any|null,header:any){
   
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
  console.log(headers);
  
    return this.http.get(url,{headers:headers});
}

//Method for Post Request
externalPostData(url:string,getParams:any|null,header:any){
    const headers = new HttpHeaders();
    console.log(header);
    if(Object.keys(header).length>0){
        
        Object.keys(header).forEach(key => {
            headers.set(key,header[key]);
        });
    } 
    
    headers.set('Access-Control-Allow-Origin','*');
    
    console.log(headers);
    return this.http.post(url,getParams,{headers:headers})
    .pipe(catchError(this.handleError));
}

//Method for Post Request
    postData(getParams:any|null,header:any){
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
        
        // let headers={};
        // if(header){
        //     headers=header;
        // }   
        // const header1={
        //     'Access-Control-Allow-Origin':'*'
        // };
        
        // return this.http.post(environment.API_URL,[],{headers:header1,params:getParams})
        // .pipe(catchError(this.handleError));
    }
    postDataForFile(getParams:any|null,header:any){
        
        let headers={};
        if(header){
            headers=header;
        }  
         
        
        
        return this.http.post(environment.API_URL,getParams,{headers:headers})
        .pipe(catchError(this.handleError));
    }


    postRequest(getParams:any|null,header:any){
        
        let headers={};
        if(header){
            headers=header;
        }   
        let body = new FormData();
        if(Object.keys(getParams).length>0){
            
            Object.keys(getParams).forEach(key => {
                
                if(typeof getParams[key]=='object'){
                    body.append(key,JSON.stringify(getParams[key]));
                }else{

                    body.append(key,getParams[key]);
                }
                
            });
        }
        return this.http.post(environment.API_URL,body,{headers:headers})
        .pipe(catchError(this.handleError));

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