import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Applied Vision Baseball';
  constructor(private authService:AuthService){}
  
  ngOnInit(){
    // check everytime user logged in or not 
    this.authService.autoLogin();
  }
}
