import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin=true;
  error:string;
  showloader:boolean=false;
  showError=false;
  authForm = new FormGroup({
    email: new FormControl('jvinod0302@gmail.com ',[Validators.required]),
       password: new FormControl('Informatics@123',Validators.required),
  });
  
  

  logo='../../assets/icons/logo.png';
  

  constructor(
    private authService:AuthService,
    private router:Router,
   
    ) {
    this.isLogin=true;
    this.showloader=false;
   }

  ngOnInit(): void {
    
  }

   //convenience getter for easy access to form fields
   get authFormControls() { return this.authForm.controls; }

  switchAuth(){
    this.isLogin=!this.isLogin;
  }

  submitForm(){
   
    if(!this.authForm.valid){
    return ;
    }
    this.showloader=true;
   
    this.authService.login(this.authForm.value).subscribe((res:any)=>{
      this.showloader=false;
        if(res.status){
          this.router.navigate(['/member']);
        }else{
          
          this.showError=res.msg;
        }

      },errorMessage=>{
        this.error=errorMessage;
        console.log({errorMessage});
      });
   
  }

  onLogout(){
    this.authService.logout();
  }
}
