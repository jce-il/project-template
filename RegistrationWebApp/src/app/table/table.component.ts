import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import {Pipe} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UploadFileService } from '../services/upload-file.service';
import { FileUpload } from '../fileupload';
import { Project } from '../project';
import {ElementRef,Renderer} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import * as $ from 'jquery';
import { ActivatedRoute,Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Pipe({
	name: 'safe'
})
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class  TableComponent implements OnInit {

  projectNames: string[] = new Array();
  obj:string = undefined;
  Recommendation: string;
  title: string;
  selected_recommendation_files: FileList;
  current_recommendation_FileUpload: FileUpload;
  project: Project;
  progress: { percentage: number } = { percentage: 0 };
  inputCheckerList:string;
  flg: boolean = false;
  page;
  team:string;
  inCompetition:string;


  constructor(public db: DatabaseService,private cookieService: CookieService,
    public uploadService: UploadFileService,private elementRef: ElementRef,private renderer: Renderer,private route: ActivatedRoute,
  private router: Router) {}

  ngOnInit() {
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
        switch(this.db.loggedInUser.type)
        {
          case "מורה":
          {
            this.title = "פרויקטי התלמידים שלי";
            this.handleTeacher();
            $(document).ready(function(){
              $(".load button").click(function() {
                $(".window").attr('id', this.id).show().fadeIn( 400 );
              });
              $(".load button").bind('click', function (event) {
                $('.modal-content').css('left',event.pageX);      // <<< use pageX and pageY
                $('.modal-content').css('top',event.pageY);
                $('.modal-content').css('display','inline');     
                });
              $("#close").click(function(){
                $(".window").hide();
              })
          });
            break;
          }
          case "בודק":
          {
            this.title="פרוייקטים לבדיקה";
          //  this.handleChecker();
            break;
          }
          case "מנהל":
          {
            if(this.page==1){
              this.title="פרוייקטים בתחרות";
              if(!this.flg){this.db.getCheckers()};
              this.handleMaster1();
            $(".btn-labeled").click(res => {
              var TableLine =res.currentTarget.name;  
              if($("input[id="+TableLine+"]").val()==""){
                alert("נא לבחור בודק מהרשימה!");
                return;
              }
              else{
                var selected = $("input[id="+TableLine+"]").val();
                var str = selected.slice(selected.indexOf("-")+1,selected.length);
                this.db.projectsList[TableLine].checkerMail = str;
                this.db.project = this.db.projectsList[TableLine];
                this.db.updateProjectListing(this.db.projectsList[TableLine].project_name);
                this.flg = true;
              }
            });
            $(".btn-warning").click(res =>{
              var TableLine =res.currentTarget.name;  
              this.db.projectsList[TableLine].inCompetition = false; 
              this.db.project = this.db.projectsList[TableLine];
              this.db.updateProjectListing(this.db.projectsList[TableLine].project_name);
            });
            $(".btn-info").click(res =>{
              var TableLine =res.currentTarget.name;  
              this.db.projectsList[TableLine].inCompetition = true;
              this.db.project = this.db.projectsList[TableLine];
              this.db.updateProjectListing(this.db.projectsList[TableLine].project_name);
            });
            }
            else if(this.page==2){
              this.title="רשימת משתמשי המערכת";
              this.handleMaster2();
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

  handleTeacher(){
    this.obj = "<table class='table table-striped table-bordered' id='myTable'><thead><tr><th>שם פרוייקט</th><th>סטאטוס</th><th>הוספת המלצה</th><th>פריט עבודה נוכחי</th></tr></thead><tbody>";
    for (var i = 0; i < this.db.projectsList.length; i++) {
      if (this.db.projectsList[i].school_contact_mail == this.db.loggedInUser.email) {
        var str = this.router.parseUrl('/viewproject;id='+this.db.projectsList[i].project_name+'');
        this.obj+="<tr><td><a href="+str+">"+this.db.projectsList[i].project_name+"</a></td>"
                  +"<td>"+this.db.projectsList[i].status+"</td>"
                  +"<td class='load' ><button type='button' id="+i+" class='btn btn-labeled btn-primary'>שנה/הוסף</button></br>";
        if(this.db.projectsList[i].recommendation_file==null){
          this.obj+="לא קיים קובץ המלצה במערכת</td>"
        }
        else{this.obj+="<a href="+this.db.projectsList[i].recommendation_file.url+">"+this.db.projectsList[i].recommendation_file.name+"</a></td>"}  
        if(this.db.projectsList[i].project_file==null){
          this.obj+="<td>לא קיים פריט עבודה במערכת</td></tr>"
        }
        else{this.obj+="<td><a href="+this.db.projectsList[i].project_file.url+">"+this.db.projectsList[i].project_file.name+"</a></td></tr>"}          
      }    
  }
  this.obj+="</tbody></table>" ; 
  $(".widget-content").html(this.obj);
 
}


selectRecommendationFile(event) {
  this.selected_recommendation_files = event.target.files;
}

recommendationUpload() {
  this.project=this.db.projectsList[$(".window").attr('id')];
  const file = this.selected_recommendation_files.item(0);
  this.selected_recommendation_files = undefined;
  this.uploadService.basePath = this.project.project_name;
  this.current_recommendation_FileUpload = new FileUpload(file);
  this.uploadService.pushFileToStorage(this.current_recommendation_FileUpload, this.progress).then(() => {
    this.project.recommendation_file = this.current_recommendation_FileUpload;
    this.db.project = this.project;
    this.db.updateProjectListing(this.project.project_name);
    let time = Observable.timer(0,1000);
    let subscription = time.subscribe(t=>{t*10; 
      if(t==2)
      {
        this.progress.percentage=0;
        $(".window").hide();
        subscription.unsubscribe();
        this.current_recommendation_FileUpload = undefined;
      } 
    });
  })
}


handleChecker(){
    
}
 

  handleMaster1(){
    this.createCheckersInputList();
    this.obj = "<table class='table table-striped table-bordered' id='myTable'><thead><tr><th>שם פרוייקט</th><th>תאריך יצירה</th><th>סוג העבודה</th><th>תחום</th><th>חברי צוות</th>"+
    "<th>איש הקשר</th><th>המלצה</th><th>פריט עבודה נוכחי</th><th>בתחרות</th><th>הקצאת בודק</th><th>שיוך בודק</th></tr></thead><tbody>";
    for (var i = 0; i < this.db.projectsList.length; i++) {
      this.createTeam(i);
      var str = this.router.parseUrl('/viewproject;id='+this.db.projectsList[i].project_name+'');
      this.obj+="<tr><td><a href="+str+">"+this.db.projectsList[i].project_name+"</a></td>";
      var date=new Date(this.db.projectsList[i].date);
      this.obj+="<td>"+date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear().toString()+"</td>"+
                "<td>"+this.db.projectsList[i].type+"</td>"+
                "<td>"+this.db.projectsList[i].project_field+"</td>"+
                "<td>"+this.team+"</td>"+
                "<td>"+this.db.projectsList[i].school_contact_mail+"</td>";
      if(this.db.projectsList[i].recommendation_file==null){
        this.obj+="<td>לא קיים פריט עבודה במערכת</td>"
      }
      else{this.obj+="<td><a href="+this.db.projectsList[i].recommendation_file.url+">"+this.db.projectsList[i].recommendation_file.name+"</a></td>"}  
      if(this.db.projectsList[i].project_file==null){
        this.obj+="<td>לא קיים פריט עבודה במערכת</td>"
      }
      else{this.obj+="<td><a href="+this.db.projectsList[i].project_file.url+">"+this.db.projectsList[i].project_file.name+"</a></td>"}
      if(this.db.projectsList[i].inCompetition){ this.inCompetition = "התקבל";}
      else{ this.inCompetition = "נדחה";}
      this.obj+="<td><button type='button' name="+i+" class='btn btn-info btn-circle'><i class='glyphicon glyphicon-ok'></i></button>"+
                "<button type='button' name="+i+" class='btn btn-warning btn-circle'><i class='glyphicon glyphicon-remove'></i></button>"+this.inCompetition+"</td>";
      if(this.db.projectsList[i].checkerMail != undefined){
        this.obj+="<td><form><input list='chekers' id="+i+"></form><datalist id='chekers'>"+this.inputCheckerList+"<div>הבודק הנוכחי הינו:    "+this.db.projectsList[i].checkerMail+"</div></td>";
        this.obj+="<td><button type='button' name="+i+" class='btn btn-labeled btn-primary'>שייך</button></td></tr>"
      }
      else{
        this.obj+="<td><form><input list='chekers' id="+i+"></form><datalist id='chekers'>"+this.inputCheckerList+"</td>";
        this.obj+="<td><button type='button' name="+i+" class='btn btn-labeled btn-primary'>שייך</button></td></tr>"
      }           
    }
    this.obj+="</tbody></table>" ; 
    $(".widget-content").html(this.obj);
  }

createTeam(index){
  this.team="";
  if(this.db.projectsList[index].user1mail!=undefined)
      this.team+=this.db.projectsList[index].user1mail+"</br>";
  if(this.db.projectsList[index].user2mail!=undefined)
      this.team+=this.db.projectsList[index].user2mail+"</br>";
  if(this.db.projectsList[index].user3mail!=undefined)
      this.team+=this.db.projectsList[index].user3mail+"";
}

createCheckersInputList(){
  this.inputCheckerList = "";
  for(var i=0;i<this.db.checkersList.length;i++){
    this.inputCheckerList+="<option>"+this.db.checkersList[i].firstName+" "+this.db.checkersList[i].lastName+"-"+this.db.checkersList[i].email+"</option>";
  }
  this.inputCheckerList+="</datalist>";
}

  handleMaster2(){
    this.obj= "<table class='table table-striped table-bordered' id='myTable'><thead><tr><th>שם משתמש</th><th>סוג</th><th>תעודת זהות</th><th>כתובת דואל אלקטרוני</th>"+
    "<th>סיסמא</th><th>טלפון</th></tr></thead><tbody>";
    for(var i=0;i<this.db.usersList.length;i++){
      var str = this.router.parseUrl('/registrationForm;email='+this.db.usersList[i].email+'');
      this.obj+="<tr><td><a href="+str+">"+this.db.usersList[i].firstName+" "+this.db.usersList[i].lastName+"</a></td>"+
                "<td>"+this.db.usersList[i].type+"</td>"+
                "<td>"+this.db.usersList[i].userid+"</td>"+
                "<td>"+this.db.usersList[i].email+"</td>"+
                "<td>"+this.db.usersList[i].password+"</td>"+
                "<td>"+this.db.usersList[i].phone+"</td></tr>";
    }
    this.obj+="</tbody></table>" ; 
    $(".widget-content").html(this.obj);

  }

     search() {
      var input, filter, table,i,j,tableColCount;
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


}
