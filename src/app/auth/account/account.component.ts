import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  showloader=false;
  authForm:any;
  file: File = null;
  profileImage: string = "";
  loading: boolean = false; // Flag variable
  constructor(private authService:AuthService) { 
    let userData=this.authService.userDetails();
    this.profileImage=userData.profileImage;
    this.authForm = new FormGroup({
    email: new FormControl(userData.userEmail,[Validators.required]),
    password: new FormControl('',Validators.required),
    confirmpassword:new FormControl(),
    username:new FormControl(userData.userName),
    firstname:new FormControl(userData.firstName),
    lastname:new FormControl(userData.lastName),
    displayname:new FormControl(userData.displayName),
  });
  }
  

   // On file Select
   


  ngOnInit(): void {
   
  }

  
    //convenience getter for easy access to form fields
    get authFormControls() { return this.authForm.controls; }


    submitForm(){
   
      if(!this.authForm.valid){
      return ;
      }
      this.showloader=true;
     
     
     
    }

    onChange(event) {
      this.file = event.target.files[0];
    }
  
    // OnClick of button Upload
    onUpload() {
      this.loading = !this.loading;
      console.log(this.file);
     // this.authService.upload(this.file);
      this.authService.upload(this.file).subscribe(
          (event: any) => {
            console.log(event);
              if (typeof (event) === 'object') {
  
                  // Short link via api response
                  this.profileImage = event.link;
  
                  this.loading = false; // Flag variable 
              }
          }
      );
  }
}
