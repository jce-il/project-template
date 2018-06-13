import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-checkers-page',
  templateUrl: './checkers-page.component.html',
  styleUrls: ['./checkers-page.component.css']
})
export class CheckersPageComponent implements OnInit {

  msg_counter = 0;
  date: Date;
  works = 0;
  
  constructor(public db: DatabaseService, public router: Router, public auth: AuthService, private cookieService: CookieService) { }

  ngOnInit() {
    this.db.getLoggedInUser().then(()=>{
      if(this.db.loggedInUser.type != 'בודק')
      {
        this.cookieService.set('managerLoggedIn', 'false');
        this.cookieService.set('User login status', 'false');
        this.cookieService.set('mode', 'no-manager');
        this.cookieService.set('checkerLoggedIn', 'false');
        this.db.loggedIn = 'false';
        this.auth.LogOut();
        this.router.navigate(['loginScreen']);
      }
    })

    this.date = new Date();
      this.date.setDate(this.date.getDate() - 3);
    this.db.getLoggedInUser().then(()=>{
      for (var i = this.db.loggedInUser.messages.length - 1; i >= 0; i--) {
        if (this.db.loggedInUser.messages[i].date != null) {
          var str_date = this.db.loggedInUser.messages[i].date.toString();
          var tmp_str = str_date.split("/");
          var tmp_date: Date = new Date(parseInt(tmp_str[2]), parseInt(tmp_str[1]), parseInt(tmp_str[0]), 0, 0, 0, 0);

          if (tmp_date >= this.date)
            this.msg_counter++;
        }
      }
    })
    this.countProjects();

  }

  // on log out button click
  public logOut() {
    this.cookieService.set('User login status', 'false');
    this.auth.LogOut();
    this.db.loggedIn = 'false';
  }

  // on home page button click
  public homePage() {
    this.router.navigate(['checker'])
  }

  // on message info button click
  public msgPage() {
    this.router.navigate(['msgpage']);
  }
  public countProjects()
  {
   var temp = this.db.loggedInUser.email;
    for(var i=0; i<this.db.projectsList.length; i++)
    {
      if(temp == this.db.projectsList[i].checkerMail)
      {
        if(this.db.projectsList[i].check==undefined)
          this.works++;
      }
    }
  }
}
