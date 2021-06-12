import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Applied Vision Baseball Pitch Recognition and Vision Training - Applied Vision Baseball';
  currentRoute: string;
  //hideHeaderFooter:boolean;
  constructor(
    private authService:AuthService,
    private router:Router
    ){
      
      // this.hideHeaderFooter=true;
      // this.router.events.pipe(
      //   filter(event => event instanceof NavigationEnd)).subscribe((event:any) => 
      //      {
      //         this.currentRoute = event.url;          
      //         if(this.currentRoute=='/auth' || this.currentRoute =='/quiztemplate'){
      //           this.hideHeaderFooter=false;
      //          }
      //      });


    }


  ngOnInit(){
    // check everytime user logged in or not 
    this.authService.autoLogin();
  }
  
}
