import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-steps-bar',
  templateUrl: './steps-bar.component.html',
  styleUrls: ['./steps-bar.component.css']
})
export class StepsBarComponent implements OnInit {
  isStudent: boolean;
  isChecker: boolean;
  myProjectText: string;

  constructor(public db: DatabaseService, public auth: AuthService, public router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.db.getLoggedInUser().then(() => {
    if( this.db.loggedInUser.type == 'תלמיד'){
      this.isStudent = true;
      this.myProjectText = "הפרויקט שלי"
    }
    else{
      this.isStudent = false;
      this.myProjectText = "פרויקטי תלמידים"
    }
    
    if(this.db.loggedInUser.type == 'בודק'){
      this.isChecker = true;
    }
    else{
      this.isChecker = false;
    }
    })
  }

  // on log out button click
  public logOut() {
    this.cookieService.set('User login status', 'false');
    this.auth.LogOut();
    this.db.loggedIn = 'false';
  }

  // on home page button click
  public homePage() {
    if(this.db.loggedInUser.type=='בודק')
      this.router.navigate(['checker']);
    else
    this.router.navigate(['homepage'])
  }
  // on personal info button click
  public personalInfo() {
    this.router.navigate(['registrationForm']);
  }

  // on contact us button click
  public contactUs() {
    this.router.navigate(['contactUs']);
  }
  // on My Project info button click
  public MyProject() {
    this.router.navigate(['projectUpload']);
  }

  public MyProjectView() {
    if(this.db.loggedInUser.type=='מורה')
         this.router.navigate(['tablePage']);
    else
         this.router.navigate(['viewproject']);
  }

    // on message info button click
    public msgPage() {
      this.router.navigate(['msgpage']);
    }

}
