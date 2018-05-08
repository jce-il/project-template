import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {

  constructor(public db: DatabaseService, public auth: AuthService, public router: Router) { }

  ngOnInit() {
    this.db.registeredUsers = ''; //clean string - this is temp info only
    this.db.getLoggedInUser(); // in order to print logged in user info - on init get it
  }

//on update info button click updates logged in users info according to the info that was inserted in the temporary update form
public updateInfo() {
  this.db.updateListing(this.db.loggedInUser.email);
  alert("Data updated!");
}

}
