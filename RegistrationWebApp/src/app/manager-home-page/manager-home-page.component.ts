import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { DatabaseService } from '../services/database.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-manager-home-page',
  templateUrl: './manager-home-page.component.html',
  styleUrls: ['./manager-home-page.component.css']
})
export class ManagerHomePageComponent implements OnInit {

  user_exp = [];
  proj_exp = [];

  constructor(public excelService: ExcelService, public db: DatabaseService, public router: Router) { }

  ngOnInit() {
    this.db.setMetaData();
    this.db.getProjectMetaData().subscribe((res)=>{
      this.db.projectsList = res;
    })
  }

  exportUsersToExcel() {
    this.db.exportUsers();
    this.excelService.exportAsExcelFile(JSON.parse(JSON.stringify(this.db.user_exp)), 'users');
  }

  exportProjectsToExcel() {
    this.db.exportProjects();
    this.excelService.exportAsExcelFile(JSON.parse(JSON.stringify(this.db.proj_exp)), 'projects');
  }

  projectesTable(){
    this.router.navigate(['tablePage']);
}

}

