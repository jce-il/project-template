import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';


@Component({
  selector: 'app-steps-bar',
  templateUrl: './steps-bar.component.html',
  styleUrls: ['./steps-bar.component.css']
})
export class StepsBarComponent implements OnInit {
  isStudent: boolean;
  isChecker: boolean;
  isMaster: boolean;
  myProjectText: string;
  showSetComp = false;
  show_count = 0;

  constructor(public db: DatabaseService, public auth: AuthService, public router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.db.loggedInUserUID = this.cookieService.get('User uid');
    this.db.loggedIn = this.cookieService.get('User login status');
    this.db.getLoggedInUser().then(() => {
      this.pageButtonColor();
      if (this.db.loggedInUser.type == 'תלמיד') {
        this.isStudent = true;
        this.myProjectText = "הפרויקט שלי"
        $(document).ready(function () {
          $(".process-row").append("<style>.process-row:before {width: 1000px;}");
          $("p").append("<style>p {width: 125px;}");
        });
      }
      else {
        this.isStudent = false;
        this.myProjectText = "פרויקטי תלמידים";
        $(document).ready(function () {
          $("p").append("<style>p {width: 125px;}");
          $(".process-row").append("<style>.process-row:before {width: 1000px;}");
        });

      }

      if (this.db.loggedInUser.type == 'בודק') {
        this.isChecker = true;
        $(document).ready(function () {
          $("p").append("<style>p{width: 135px;}");
        });
      }
      else {
        this.isChecker = false;
      }

      if (this.db.loggedInUser.type == 'מנהל') {
        this.isMaster = true;
      }
      else {
        this.isMaster = false;
      }
    })
  }

  // on log out button click
  public logOut() {
    this.cookieService.set('managerLoggedIn', 'false');
    this.cookieService.set('User login status', 'false');
    this.cookieService.set('mode', 'no-manager');
    this.cookieService.set('checkerLoggedIn', 'false');
    this.auth.LogOut();
    this.db.loggedIn = 'false';
  }

  // on home page button click
  public homePage() {
    if (this.db.loggedInUser.type == 'בודק')
      this.router.navigate(['checker']);
    else if (this.db.loggedInUser.type == 'מנהל')
      this.router.navigate(['manager']);
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
    /*   if(this.db.loggedInUser.type=='בודק')
             this.router.navigate(['tablePage']);
       else*/
    this.router.navigate(['projectUpload']);
  }

  public MyProjectView() {
    if (this.db.loggedInUser.type == 'מורה')
      this.router.navigate(['tablePage']);
    else if (this.db.loggedInUser.type == 'בודק')
      this.router.navigate(['tablePage']);
    else
      this.router.navigate(['viewproject']);
  }

  // on message info button click
  public msgPage() {
    this.router.navigate(['msgpage']);
  }

  openCompetition() {
    this.router.navigate(['/compsettings']);
  }

  projectesTable(userName) {
    this.router.navigate(['/tablePage'], { queryParams: { page: userName } });
  }

  public go_to_reg(status) {
    this.cookieService.set('mode', status);
    this.router.navigate(['registrationForm']);
    location.reload();
  }

  public pageButtonColor(){
    if(this.cookieService.get('page') == 'userHomePage'){
      $(document).ready(function () {
        $(".userHomePage").css("background-color", 'black');
      });
    }
    else if(this.cookieService.get('page') == 'registrationForm'){
      $(document).ready(function () {
        $(".registrationForm").css("background-color", 'black');
      });
    }
    else if(this.cookieService.get('page') == 'table' || this.cookieService.get('page') == 'uploadScreen' || this.cookieService.get('page') == 'updateScreen'){
      $(document).ready(function () {
        $(".project").css("background-color", 'black');
      });
    }
    else if(this.cookieService.get('page') == 'msg'){
      $(document).ready(function () {
        $(".msgUserPage").css("background-color", 'black');
      });
    }
  
    else if(this.cookieService.get('page') == 'contactusPage'){
      $(document).ready(function () {
        $(".contactPage").css("background-color", 'black');
      });
    }
  
  }




}
