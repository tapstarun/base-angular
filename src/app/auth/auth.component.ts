import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin=true;
  authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  constructor(private authService:AuthService) {
    this.isLogin=true;
   }

  ngOnInit(): void {
    
  }

  switchAuth(){
    this.isLogin=!this.isLogin;
  }

  submitForm(){
    this.authService.signupForm(this.authForm.value);
  }
}
