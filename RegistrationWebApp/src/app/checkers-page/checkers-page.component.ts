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

  constructor(public db: DatabaseService, public router: Router, public auth: AuthService, private cookieService: CookieService) { }

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
    this.router.navigate(['checker'])
  }

  // on message info button click
  public msgPage() {
    this.router.navigate(['msgpage']);
  }
}
