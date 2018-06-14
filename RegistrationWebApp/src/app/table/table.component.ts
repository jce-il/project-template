import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Pipe } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UploadFileService } from '../services/upload-file.service';
import { FileUpload } from '../fileupload';
import { Project } from '../project';
import { Observable } from 'rxjs/Rx';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../services/excel.service';
import { AuthService } from '../services/auth.service';


@Pipe({
  name: 'safe'
})
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  projectNames: string[] = new Array();
  obj: string = undefined;
  Recommendation: string;
  title: string;
  selected_recommendation_files: FileList;
  current_recommendation_FileUpload: FileUpload;
  project: Project;
  progress: { percentage: number } = { percentage: 0 };
  inputCheckerList: string;
  page;
  team: string;
  inCompetition: string;



  constructor(public auth: AuthService, public db: DatabaseService, private cookieService: CookieService,
    public uploadService: UploadFileService, private route: ActivatedRoute, private router: Router,
    public excelService: ExcelService) {  this.router.routeReuseStrategy.shouldReuseRoute = function() {//this method reload the ngoninit after navigation
      return false;
  };
}

  ngOnInit() {
    this.cookieService.set('page', 'table');
    this.db.getLoggedInUser().then(() => {
      if (this.db.loggedInUser.type == 'תלמיד') {
        this.cookieService.set('managerLoggedIn', 'false');
        this.cookieService.set('User login status', 'false');
        this.cookieService.set('mode', 'no-manager');
        this.cookieService.set('checkerLoggedIn', 'false');
        this.db.loggedIn = 'false';
        this.auth.LogOut();
        this.router.navigate(['loginScreen']);
      }
    })

    $(".window").hide();
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'];
    });
    this.db.loggedInUserUID = this.cookieService.get('User uid');
    this.db.loggedIn = this.cookieService.get('User login status');
    this.db.setMetaData();
    this.db.getLoggedInUser().then(() => {
      this.db.getProjectMetaData().subscribe((val) => {
        this.db.projectsList = val;
        this.db.getCheckers()
        switch (this.db.loggedInUser.type) {
          case "מורה":
            {
              this.title = "פרויקטי התלמידים שלי";
              this.handleTeacher();
              $(document).ready(function () {
                $(".load button").click(function () {
                  $(".window").attr('id', this.id).show().fadeIn(400);
                });
                $(".load button").bind('click', function (event) {
                  $('.modal-content').css('left', event.pageX);      // <<< use pageX and pageY
                  $('.modal-content').css('top', event.pageY);
                  $('.modal-content').css('width', '25%');      // <<< use pageX and pageY
                  $('.modal-content').css('height', '25%');
                });
                $("#close").click(function () {
                  $(".window").hide();
                })
              });
              break;
            }
          case "בודק":
            {
              this.title = "פרוייקטים לבדיקה";
              this.handleChecker();
              break;
            }
          case "מנהל":
            {
              $(".center-block").click(res => {
                if (this.page == 1) { this.exportProjectsToExcel(); }
                else { this.exportUsersToExcel(); }
              });
              if (this.page == 1) {
                this.title = "פרוייקטים בתחרות";
                this.handleMaster1();
                $(".btn-labeled").click(res => {
                  var TableLine = res.currentTarget.name;
                  if ($("input[id=" + TableLine + "]").val() == "") {
                    alert("נא לבחור בודק מהרשימה!");
                    return;
                  }
                  else {
                    var selected = $("input[id=" + TableLine + "]").val();
                    var str = selected.slice(selected.indexOf("-") + 1, selected.length);
                    this.db.projectsList[TableLine].checkerMail = str;
                    this.db.project = this.db.projectsList[TableLine];
                    this.db.updateProjectListing(this.db.projectsList[TableLine].project_name);
                  }
                });
                $(".btn-warning").click(res => {
                  var TableLine = res.currentTarget.name;
                  this.db.projectsList[TableLine].inCompetition = false;
                  this.db.project = this.db.projectsList[TableLine];
                  this.db.updateProjectListing(this.db.projectsList[TableLine].project_name);
                });
                $(".btn-info").click(res => {
                  var TableLine = res.currentTarget.name;
                  this.db.projectsList[TableLine].inCompetition = true;
                  this.db.project = this.db.projectsList[TableLine];
                  this.db.updateProjectListing(this.db.projectsList[TableLine].project_name);
                });
              }
              else if (this.page == 2) {
                this.title = "רשימת משתמשי המערכת";
                this.handleMaster2();
                $(".btn-inverse").click(res =>{
                  var TableLine = res.currentTarget.name;
                  var msg = "האם אתה בטוח שברצונך למחוק את המשתמש ";
                  if(window.confirm(msg+this.db.usersList[TableLine].firstName+" "+
                        this.db.usersList[TableLine].lastName+"?")){
                          this.db.deleteListing(this.db.usersList[TableLine].email);
                          $("#"+TableLine+"").remove();
                        }
                });
                $("td").click(() => {
                  this.cookieService.set('mode', 'updateUser');
                })
              }
              break;
            }
        }
      })
    })
  }

  handleTeacher() {
    this.obj = "<table class='table table-striped table-bordered' id='myTable'><thead><tr><th>שם פרוייקט</th><th>סטאטוס</th><th>הוספת המלצה</th><th>פריט עבודה נוכחי</th></tr></thead><tbody>";
    for (var i = 0; i < this.db.projectsList.length; i++) {
      if (this.db.projectsList[i].school_contact_mail == this.db.loggedInUser.email) {
        var str = this.router.parseUrl('/viewproject;id=' + this.db.projectsList[i].project_name + '');
        this.obj += "<tr><td><a href=" + str + ">" + this.db.projectsList[i].project_name + "</a></td>"
          + "<td>" + this.db.projectsList[i].status + "</td>"
          + "<td class='load' ><button type='button' id=" + i + " class='btn btn-labeled btn-primary'>שנה / הוסף</button></br>";
        if (this.db.projectsList[i].recommendation_file == null) {
          this.obj += "לא קיים קובץ המלצה במערכת</td>"
        }
        else { this.obj += "<a href=" + this.db.projectsList[i].recommendation_file.url + ">" + this.db.projectsList[i].recommendation_file.name + "</a></td>" }
        if (this.db.projectsList[i].project_file == null) {
          this.obj += "<td>לא קיים פריט עבודה במערכת</td></tr>"
        }
        else { this.obj += "<td><a href=" + this.db.projectsList[i].project_file.url + ">" + this.db.projectsList[i].project_file.name + "</a></td></tr>" }
      }
    }
    this.obj += "</tbody></table>";
    $(".widget-content").html(this.obj);
  }


  selectRecommendationFile(event) {
    this.selected_recommendation_files = event.target.files;
  }

  recommendationUpload() {
    this.project = this.db.projectsList[$(".window").attr('id')];
    const file = this.selected_recommendation_files.item(0);
    this.selected_recommendation_files = undefined;
    this.uploadService.basePath = this.project.project_name;
    this.current_recommendation_FileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.current_recommendation_FileUpload, this.progress).then(() => {
      this.project.recommendation_file = this.current_recommendation_FileUpload;
      this.db.project = this.project;
      this.db.updateProjectListing(this.project.project_name);
      let time = Observable.timer(0, 1000);
      let subscription = time.subscribe(t => {
        t * 10;
        if (t == 2) {
          this.progress.percentage = 0;
          $(".window").hide();
          subscription.unsubscribe();
          this.current_recommendation_FileUpload = undefined;
        }
      });
    })
  }


  handleChecker() {
    this.obj = "<table class='table table-striped table-bordered' id='myTable'><thead><tr><th>שם פרוייקט</th><th>איש קשר</th><th>פריט עבודה נוכחי</th>" +
      "<th>קובץ המלצה נוכחי</th><th>הערות למיון</th></tr></thead><tbody>";
    for (var i = 0; i < this.db.projectsList.length; i++) {
      if (this.db.loggedInUser.email == this.db.projectsList[i].checkerMail) {
        var str = this.router.parseUrl('/viewproject;id=' + this.db.projectsList[i].project_name + '');
        this.obj += "<tr><td><a href=" + str + ">" + this.db.projectsList[i].project_name + "</a></td>" +
          "<td>" + this.db.projectsList[i].school_contact_mail + "</td>";
        if (this.db.projectsList[i].project_file == null) {
          this.obj += "<td>לא קיים פריט עבודה במערכת</td>"
        }
        else { this.obj += "<td><a href=" + this.db.projectsList[i].project_file.url + ">" + this.db.projectsList[i].project_file.name + "</a></td>" }
        if (this.db.projectsList[i].recommendation_file == null) {
          this.obj += "<td>לא קיים קובץ המלצה במערכת</td>"
        }
        else { this.obj += "<td><a href=" + this.db.projectsList[i].recommendation_file.url + ">" + this.db.projectsList[i].recommendation_file.name + "</a></td>" }
        this.obj += "<td><button id=" + i + " class='btn btn-checker btn-lg' data-toggle='modal' data-target='#myModal'>" +
          "צפיה בהערות הבודק</button></td></tr>";
      }
    }
    this.obj += "</tbody></table>";
    $(".widget-content").html(this.obj);
    this.checkerRecommendation(1);
  }

 

  handleMaster1() {
    this.createCheckersInputList();
    this.obj = "<table class='table table-striped table-bordered' id='myTable'><thead><tr><th>שם פרוייקט</th><th>תאריך יצירה</th><th>סוג העבודה</th><th>תחום</th><th>חברי צוות</th>" +
      "<th>איש הקשר</th><th>המלצה</th><th>פריט עבודה נוכחי</th><th>בתחרות</th><th>הקצאת בודק</th><th>שיוך בודק</th></tr></thead><tbody>";
    for (var i = 0; i < this.db.projectsList.length; i++) {
      this.createTeam(i);
      var str = this.router.parseUrl('/viewproject;id=' + this.db.projectsList[i].project_name + '');
      this.obj += "<tr><td><a href=" + str + ">" + this.db.projectsList[i].project_name + "</a></td>";
      var date = new Date(this.db.projectsList[i].date);
      this.obj += "<td>" + date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString() + "</td>" +
        "<td>" + this.db.projectsList[i].type + "</td>" +
        "<td>" + this.db.projectsList[i].project_field + "</td>" +
        "<td>" + this.team + "</td>" +
        "<td>" + this.db.projectsList[i].school_contact_mail + "</td>";
      if (this.db.projectsList[i].recommendation_file == null) {
        this.obj += "<td>לא קיים קובץ המלצה במערכת</td>"
      }
      else { this.obj += "<td><a href=" + this.db.projectsList[i].recommendation_file.url + ">" + this.db.projectsList[i].recommendation_file.name + "</a></td>" }
      if (this.db.projectsList[i].project_file == null) {
        this.obj += "<td>לא קיים פריט עבודה במערכת</td>"
      }
      else { this.obj += "<td><a href=" + this.db.projectsList[i].project_file.url + ">" + this.db.projectsList[i].project_file.name + "</a></td>" }
      if (this.db.projectsList[i].inCompetition) { this.inCompetition = "התקבל"; }
      else { this.inCompetition = "נדחה"; }
      this.obj += "<td width='105px'><button type='button' name=" + i + " class='btn btn-info btn-circle'><i class='glyphicon glyphicon-ok'></i></button>&nbsp;" +
        "<button type='button' name=" + i + " class='btn btn-warning btn-circle'><i class='glyphicon glyphicon-remove'></i></button>" + this.inCompetition + "</td>";
      if (this.db.projectsList[i].checkerMail != undefined) {
        this.obj += "<td><form><input list='chekers' id=" + i + "></form><datalist id='chekers'>" + this.inputCheckerList + "<div>הבודק הנוכחי הינו:    " + this.db.projectsList[i].checkerMail + "</div>"+
                    "<button name="+i+" class='btn btn-checker'>צפיה בהערות הבודק</button></td>";
        this.obj += "<td><button type='button' name=" + i + " class='btn btn-labeled btn-primary'>שייך</button></td></tr>"
      }
      else {
        this.obj += "<td><form><input list='chekers' id=" + i + "></form><datalist id='chekers'>" + this.inputCheckerList + "</td>";
        this.obj += "<td><button type='button' name=" + i + " class='btn btn-labeled btn-primary'>שייך</button></td></tr>"
      }
    }
    this.obj += "</tbody></table>";
    $(".widget-content").html(this.obj);
    this.checkerRecommendation(2);
  }

  createTeam(index) {
    this.team = "";
    var str,currentProj = this.db.projectsList[index];
    for(var i=0;i<this.db.usersList.length;i++){
      if (currentProj.user1mail!=undefined && this.db.usersList[i].email==currentProj.user1mail){
        str = this.router.parseUrl('/registrationForm;email=' + this.db.projectsList[index].user1mail + '');
        this.team +="<a href=" + str + ">" +this.db.usersList[i].firstName+" "+this.db.usersList[i].lastName+": "+currentProj.user1mail +"</a></br>";
      }
        
      if (currentProj.user2mail!=undefined && this.db.usersList[i].email==currentProj.user2mail){
        str = this.router.parseUrl('/registrationForm;email=' + this.db.projectsList[index].user1mail + '');
        this.team +="<a href=" + str + ">"+this.db.usersList[i].firstName+" "+this.db.usersList[i].lastName+": "+currentProj.user2mail+"</a></br>";
      }
        
      if (currentProj.user3mail!=undefined && this.db.usersList[i].email==currentProj.user3mail){
        str = this.router.parseUrl('/registrationForm;email=' + this.db.projectsList[index].user1mail + '');
        this.team +="<a href=" + str + ">"+this.db.usersList[i].firstName+" "+this.db.usersList[i].lastName+": "+currentProj.user3mail+"</a>";
      }
        
    }
  }

  createCheckersInputList() {
    this.inputCheckerList = "";
    for (var i = 0; i < this.db.checkersList.length; i++) {
      this.inputCheckerList += "<option>" + this.db.checkersList[i].firstName + " " + this.db.checkersList[i].lastName + "-" + this.db.checkersList[i].email + "</option>";
    }
    this.inputCheckerList += "</datalist>";
  }

  handleMaster2() {
    this.obj = "<table class='table table-striped table-bordered' id='myTable'><thead><tr><th>שם משתמש</th><th>סוג</th><th>תעודת זהות</th><th>כתובת דואל אלקטרוני</th>" +
      "<th>סיסמא</th><th>טלפון</th><th>מחק משתמש</th></tr></thead><tbody>";
    for (var i = 0; i < this.db.usersList.length; i++) {
      var str = this.router.parseUrl('/registrationForm;email=' + this.db.usersList[i].email + '');
      this.obj += "<tr id="+i+"><td><a href=" + str + ">" + this.db.usersList[i].firstName + " " + this.db.usersList[i].lastName + "</a></td>" +
        "<td>" + this.db.usersList[i].type + "</td>" +
        "<td>" + this.db.usersList[i].userid + "</td>" +
        "<td>" + this.db.usersList[i].email + "</td>" +
        "<td>" + this.db.usersList[i].password + "</td>" +
        "<td>" + this.db.usersList[i].phone + "</td>"+
        "<td><button type='button' name="+ i +" class='btn btn-inverse'><i class='glyphicon glyphicon-trash'></i> לחץ למחיקה</button></td></tr>";
    }
    this.obj += "</tbody></table>";
    $(".widget-content").html(this.obj);
  }

  checkerRecommendation(currentValue){
    $(".btn-checker").click(res => {
      var index, text, winContent;
      if(currentValue==1){index = res.currentTarget.id;}
      else{index = res.currentTarget.name;}
      if (this.db.projectsList[index].check == undefined)
        text = "בודק יקר,</br>עדיין לא הוזנה בדיקה.</br> על מנת להזין את הבדיקה יש ללחוץ על שם העבודה ולהזין את הבדיקה בשדה המיועד לכך הנמצא בתחתית העמוד."
      else
        text = this.db.projectsList[index].check;
      winContent = "<legend><strong>הערות הבודק</strong></legend>" +
        "<div class='modal-body'><p>" + text + "</p>" +
        "<button type='button' class='btn btn-labeled' id='close' ><i class='glyphicon glyphicon-remove'></i>סגור </button></div>";
      $(".modal-content").html(winContent);
      $('.modal-content').css('max-width', '600px');
      $('.modal-content').css('max-height', '800px');
      $('.modal-content').css('left', '25%');
      $('.modal-content').css('top', '15%');
      $('legend').css('text-align', 'right');
      $('legend').css('margin', '10px 10px 0 0');
      $('legend').css('width', '95%');
      $(".modal-body p").css({
        'color': '#f8f8f8',
        'font-size': '15px',
        'width': '100%',
        'text-align': 'right'
      });
      $(".window").show();
      $("#close").click(function () {
        $(".window").hide();
      });
    });
  }

  search() {
    var input, filter, table, i, j, tableColCount;
    input = document.getElementById("myInput");
    filter = input.value;
    table = document.getElementById("myTable");
    for (i = 0; i < table.rows.length; i++) {//Loop through table rows
      var rowData = '';
      if (i == 0) {//Get column count from header row
        tableColCount = table.rows.item(i).cells.length;
        continue;
      }
      for (j = 0; j < tableColCount; j++) { //Process data rows. (rowIndex >= 1)
        rowData += table.rows.item(i).cells.item(j).textContent;
      }
      if (rowData.indexOf(filter) == -1) //If search term is not found in row data
        table.rows.item(i).style.display = 'none';
      else//then hide the row, else show
        table.rows.item(i).style.display = "";
    }
  }

  exportUsersToExcel() {
    this.db.exportUsers();
    this.excelService.exportAsExcelFile(JSON.parse(JSON.stringify(this.db.user_exp)), 'users');
  }

  exportProjectsToExcel() {
    this.db.exportProjects();
    this.excelService.exportAsExcelFile(JSON.parse(JSON.stringify(this.db.proj_exp)), 'projects');
  }
}
