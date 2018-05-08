import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-steps-bar',
  templateUrl: './steps-bar.component.html',
  styleUrls: ['./steps-bar.component.css']
})
export class StepsBarComponent implements OnInit {

  constructor(public db: DatabaseService, public auth: AuthService, public router: Router) { }

  ngOnInit() {
    this.db.registeredUsers = ''; //clean string - this is temp info only
    this.db.getLoggedInUser(); // in order to print logged in user info - on init get it
  }

  // on log out button click
  public logOut() {
    this.auth.LogOut();
    this.db.loggedIn = false;
  }

  // on home page button click
  public homePage(){
    this.router.navigate(['homepage'])
    alert("Home Page");
  }

  public personalInfo(){
    this.router.navigate(['registrationForm']);
  
  }
//on update info button click updates logged in users info according to the info that was inserted in the temporary update form
  public updateInfo() {
    this.db.updateListing(this.db.loggedInUser.email);
    alert("Data updated!");
  }
}
