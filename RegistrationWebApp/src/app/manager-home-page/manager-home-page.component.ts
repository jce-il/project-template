import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { DatabaseService } from '../services/database.service';
import { RouterLink, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-manager-home-page',
  templateUrl: './manager-home-page.component.html',
  styleUrls: ['./manager-home-page.component.css']
})
export class ManagerHomePageComponent implements OnInit {

  user_exp = [];
  proj_exp = [];
  showSetComp = false;
  show_count = 0;
  constructor(public auth: AuthService, public excelService: ExcelService, public db: DatabaseService, public router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.db.setMetaData();
    this.db.getProjectMetaData().subscribe((res) => {
      this.db.projectsList = res;
    })
  }
  /**
   * Creates an object with relevant fields for excel output
   * and then exports it to excel in xls format
   */
  exportUsersToExcel() {
    this.db.exportUsers();
    this.excelService.exportAsExcelFile(JSON.parse(JSON.stringify(this.db.user_exp)), 'users');
  }

  exportProjectsToExcel() {
    this.db.exportProjects();
    this.excelService.exportAsExcelFile(JSON.parse(JSON.stringify(this.db.proj_exp)), 'projects');
  }

  projectesTable(userName) {
    this.router.navigate(['/tablePage'], { queryParams: { page: userName } });
  }

  public go_to_reg(status) {
    this.cookieService.set('mode', status);
    this.router.navigate(['registrationForm']);
  }
  public logOut() {
    this.cookieService.set('managerLoggedIn', 'false');
    this.cookieService.set('User login status', 'false');
    this.cookieService.set('mode', 'no-manager');
    this.db.loggedIn = 'false';
    this.auth.LogOut();
  }

  openCompetition() {
    if (this.show_count % 2 == 0)
      this.showSetComp = true;
    else
      this.showSetComp = false;
    this.show_count++;
  }
}


