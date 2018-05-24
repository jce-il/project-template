import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Project } from '../project';

``
@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {

  userProject: Project;
  emptyFields = [];

  constructor(public db: DatabaseService, public auth: AuthService, public router: Router, public cookieService: CookieService) { }

  ngOnInit() {
    this.db.loggedInUserUID = this.cookieService.get('User uid');
    this.db.loggedIn = this.cookieService.get('User login status');
    this.db.getLoggedInUser(); // in order to print logged in user info - on init get it
    //get missing fields of project
    this.db.getProjectMetaData().subscribe((res) => {
      this.db.projectsList = res;
      for (var i = 0; i < this.db.projectsList.length; i++) {
        if (this.db.projectsList[i].id == this.db.loggedInUser.project)
          this.userProject = this.db.projectsList[i];
      }
      if (this.userProject.location == undefined || this.userProject.location == '')
        this.emptyFields.push('מוסד אקדמי בו התבצעה העבודה')
      if (this.userProject.advantages == undefined || this.userProject.advantages == '')
        this.emptyFields.push('יתרונות/תרומה')
      if (this.userProject.background == undefined || this.userProject.background == '')
        this.emptyFields.push('רקע')
      if (this.userProject.description == undefined || this.userProject.description == '')
        this.emptyFields.push('תיאור קצר')
      if (this.userProject.inovetion == undefined || this.userProject.inovetion == '')
        this.emptyFields.push('חדשנות')
      if (this.userProject.retrospective == undefined || this.userProject.retrospective == '')
        this.emptyFields.push('נקודת מבט אישית')
      if (this.userProject.scope == undefined || this.userProject.scope == '')
        this.emptyFields.push('היקף')
      if (this.userProject.target == undefined || this.userProject.target == '')
        this.emptyFields.push('שאלת מחקר/מטרת הפרויקט')

    })
  }

  //on update info button click updates logged in users info according to the info that was inserted in the temporary update form
  public updateInfo() {
    this.db.updateListing(this.db.loggedInUser.email);
    alert("Data updated!");
  }




  //alo
}
