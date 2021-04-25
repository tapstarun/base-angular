import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin=true;
  error:string;
  
  authForm = new FormGroup({
    email: new FormControl('jvinod0302@gmail.com ',[Validators.email,Validators.required]),
    password: new FormControl('Informatics@123',Validators.required),
  });


  constructor(private authService:AuthService) {
    this.isLogin=true;
   }

  ngOnInit(): void {
    
  }

   // convenience getter for easy access to form fields
   get authFormControls() { return this.authForm.controls; }

  switchAuth(){
    this.isLogin=!this.isLogin;
  }

  submitForm(){
    
    if(!this.authForm.valid){
    return ;
    }
      console.log(this.authForm);
      this.authService.login(this.authForm.value).subscribe(res=>{
      console.log(res);
       },errorMessage=>{
         this.error=errorMessage;
         console.log({errorMessage});
       });
   
  }
}
