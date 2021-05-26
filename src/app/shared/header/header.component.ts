import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu:any;
  isLoggedIn: Observable<boolean>;  
  leadershipUrl='';
  statsUrl='';
  
  url=environment.Url;
  constructor(private authService:AuthService) { 
    this.menu={};
  }
  
  ngOnInit(): void {

    let userData = JSON.parse(localStorage.getItem('userData'));
    const authToken=userData.authToken;
    this.leadershipUrl=this.url+'leadership?user='+authToken;
    this.statsUrl=this.url+'statistic-page?user='+authToken;
    
    
    
    //console.log(this.authService.user.authToken);
    // this.menu=[
    //   {
    //     'Home':
    //         {'auth':0,'nav':environment.Url,'external':1,'child':{}}
    //   },
    //   {
    //     'Member Area':{
    //           'auth':0,'nav':'member','external':0,
            
    //         'child':[
    //           {
    //             'Member Home':
    //                 {
    //                   'auth':0,'nav':'member','external':0
    //                 } 
    //           },
    //           {
    //             'Member Home':
    //                 {
    //                   'auth':0,'nav':'member','external':0
    //                 } 
    //           },

    //         ]
    //       }
    //   },

    // ];
  }


  logout(){
    console.log("logout");
    
    this.authService.logout();
  }

  onNavigateUrl(slug:string){
    window.location.href=environment.Url+slug;
  }
  onNavigateUrlSubdomain(subdomain:string){
      window.location.href=subdomain;
  }

}
