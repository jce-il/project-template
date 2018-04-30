import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {

  constructor(public db: DatabaseService, public auth: AuthService) { }

  ngOnInit() {
    this.db.registeredUsers = '';
    this.db.getLoggedInUser();
  }

  public logOut() {
    this.auth.LogOut();
    this.db.loggedIn = false;
  }

}
