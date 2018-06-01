import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-manager-home-page',
  templateUrl: './manager-home-page.component.html',
  styleUrls: ['./manager-home-page.component.css']
})
export class ManagerHomePageComponent implements OnInit {

  constructor(public excelService: ExcelService, public db: DatabaseService) { }

  ngOnInit() {
  }

  exportUsersToExcel() {
    this.db.getMetaData().subscribe((res) => {
      this.db.usersList = res;
      this.excelService.exportAsExcelFile(JSON.parse(JSON.stringify(this.db.usersList)), 'users');
    })
  }

  exportProjectsToExcel() {
    this.db.getProjectMetaData().subscribe((res) => {
      this.db.projectsList = res;
      this.excelService.exportAsExcelFile(JSON.parse(JSON.stringify(this.db.projectsList)), 'projects');
    })
  }

}

