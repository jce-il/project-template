import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { DatabaseService } from '../services/database.service';
import { RouterLink, Router } from '@angular/router';
import * as $ from 'jquery';
import { CompetitionSettings } from '../competition-settings'
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-manager-home-page',
  templateUrl: './manager-home-page.component.html',
  styleUrls: ['./manager-home-page.component.css']
})
export class ManagerHomePageComponent implements OnInit {
  msg_counter = 0;
  date: Date;
  comp_settings: CompetitionSettings;
  user_exp = [];
  proj_exp = [];
  showSetComp = false;
  show_count = 0;
  constructor(public auth: AuthService, public excelService: ExcelService, public db: DatabaseService, public router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.db.getLoggedInUser().then(()=>{
      if(this.db.loggedInUser.type != 'מנהל')
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
    this.db.getSettingsMetaData().subscribe((res) => {
      this.db.competition_settings_db = res;
      this.comp_settings = this.db.competition_settings_db[0];
      if (this.comp_settings.is_opened)
        this.days(); //for countdown clock
    })
    this.cookieService.set('User login status', 'true');
    this.db.loggedInUserUID = this.cookieService.get('User uid');
    this.db.loggedIn = this.cookieService.get('User login status');
    this.db.setMetaData();
    this.db.getProjectMetaData().subscribe((res) => {
      this.db.projectsList = res;
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

  public days() {
    var countDownDate = new Date(this.comp_settings.end_date).getTime();
    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      $("#jours").html(days);
      $("#heures").html(hours);
      $("#minutes").html(minutes);

      // On stylise les éléments
      $("#jours").css("background-color", 'rgba(126,85,39,0.2)');
      $("#heures").css("background-color", 'rgba(126,85,39,0.2)');
      $("#minutes").css("background-color", 'rgba(126,85,39,0.2)');

      $("jours").css("color", 'rgb(126,85,39)');
      $("heures").css("color", 'rgb(126,85,39)');
      $("minutes").css("color", 'rgb(126,85,39)');

      $("jours").css("font-weight", 'bold');
      $("heures").css("font-weight", 'bold');
      $("minutes").css("font-weight", 'bold');

      if (distance < 0) {
        clearInterval(x);
        $("demo").innerHTML = "EXPIRED";
      }
    }, 1000);

    var date = new Date();
    var annee = date.getFullYear();
    $('annee').innerHTML = annee;
  }
}


