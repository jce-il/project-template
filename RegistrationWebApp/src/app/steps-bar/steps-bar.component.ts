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

  constructor(public db: DatabaseService, public auth: AuthService, public router: Router, private cookieService: CookieService) { }

  ngOnInit() {
  }

  // on log out button click
  public logOut() {
    this.cookieService.set('User login status', 'false');
    this.auth.LogOut();
    this.db.loggedIn = 'false';
  }

  // on home page button click
  public homePage() {
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
    this.db.updateProject = false;
    this.router.navigate(['projectUpload']);
  }

  public MyProjectView() {
    this.db.updateProject = true;
    this.router.navigate(['projectUpload']);
  }

    // on message info button click
    public msgPage() {
      this.router.navigate(['msgpage']);
    }

}
