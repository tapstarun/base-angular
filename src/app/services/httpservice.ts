import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class HttpService{
constructor(private http:HttpClient){}

// Method for get request
getData(url:string,getParams:any|null,header:any){
    let params = new HttpParams();
    const headers = new HttpHeaders();
   
    if(Object.keys(getParams).length>0){
       
        Object.keys(getParams).forEach(key => {           

            params.set(key,getParams[key]);
        });
    }  
    
    if(Object.keys(header).length>0){
        
        Object.keys(header).forEach(key => {
            headers.set(key,header[key]);
        });
    } 
   
    return this.http.get(url,{headers:headers,params:params});
}

//Method for Post Request
    postData(url:string,getParams:any|null,header:any){
        let headers={};
        if(header){
            headers=header;
        }   
        return this.http.post(url,getParams,{headers});
    }


    // method for put request

    put(url:string,getParams:any,header:any){
        let headers={};
        if(header){
            headers=header;
        }  
        return this.http.put(url,getParams,{headers});
    }

    // method for the patch request
    petch(url:string,getParams:any,header:any){
        let headers={};
        if(header){
            headers=header;
        }  
        return this.http.patch(url,getParams,{headers});
    }
}