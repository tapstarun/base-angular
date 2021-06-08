import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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
  memberHover:boolean;
  
  url=environment.Url;
  constructor(private authService:AuthService) { 
    this.menu={};
    this.memberHover=false;
  }
  
  ngOnInit(): void {

    let userData = this.authService.userDetails();
    console.log(userData);
    
    const authToken=userData.authToken;

    this.menu=[
      {'title':'Your Stats','url':this.url+'statistic-page?user='+authToken},
      {'title':'Leaderboard','url':this.url+'leadership?user='+authToken},
      {'title':'Tutorials','url':this.url+'pitch-recognition-drills-tutorials'},
      {'title':'Modify Billing','url':this.url+'modify-billing/'},
      {'title':'Upgrade / Renew','url':this.url+'upgrade-plan/'}


    ]
    
  }


  category: Array<any> = [{
    catnumber: 1,
    nest: [
      {
        link: 1
      },
      {
        link: 2
      }

    ]
  },
  {
    catnumber: 2,
    nest: [
      {
        link: 1
      },
      {
        link: 2
      },
     

    ]
  },
  {
    catnumber: 3,
    nest: [
      {
        link: 1
      },
      {
        link: 2
      }

    ]
  },
  ];
  
  mouseover1(){
    console.log('hover');
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


  flag: boolean = false;

  catchEvent(event) {
    this.flag = true
    console.log(event)
  }

  hide(event) {
    this.flag = false;
  }


}
