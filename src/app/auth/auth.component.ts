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
  authForm = new FormGroup({
    email: new FormControl('jvinod0302@gmail.com ',[Validators.required,Validators.email]),
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
    this.submitForm();
  }

   //convenience getter for easy access to form fields
   get authFormControls() { return this.authForm.controls; }

  switchAuth(){
    this.isLogin=!this.isLogin;
  }

  submitForm(){
    
    // if(!this.authForm.valid){
    // return ;
    // }
    this.showloader=true;
    const data={
      'email':'jvinod0302@gmail.com',
      'password':'Informatics'

    };
    this.authService.login(data).subscribe((res:any)=>{
      
        if(res.status){
          this.router.navigate(['/member']);
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
