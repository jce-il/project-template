import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { DatabaseService } from '../services/database.service';
import {Pipe} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UploadFileService } from '../services/upload-file.service';
import { FileUpload } from '../fileupload';
import { Project } from '../project';
import {ElementRef,Renderer} from '@angular/core';
import * as $ from 'jquery';


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
  obj:string ;
  Recommendation: string;
  title: string;
  selected_recommendation_files: FileList;
  current_recommendation_FileUpload: FileUpload;
  project: Project;
  progress: { percentage: number } = { percentage: 0 }; 



  constructor(private msgService: MessageService,public db: DatabaseService,private cookieService: CookieService,
    public uploadService: UploadFileService,private elementRef: ElementRef,private renderer: Renderer) {
  
    }

  ngOnInit() {
  this.db.loggedInUserUID = this.cookieService.get('User uid');
  this.db.loggedIn = this.cookieService.get('User login status');
  this.db.getLoggedInUser().then(() => {
    this.db.getProjectMetaData().subscribe((val) => {
        this.db.projectsList = val;
        this.msgService.getCurrentTable();
        switch(this.msgService.routName)
        {
          case "teacher":
          {
            this.handleTeacher();
            $(document).ready(function(){
              $(".window").hide();
              $(".load button").click(function() {
                $(".window").attr('id', this.id).show();
              });
              $("#close").click(function(){
                $(".window").hide();
              })
          });
            break;
          }
          case "checker":
          {
            this.msgService.setCurrentTable("checker",false);
            this.handleTeacher();
            break;
          }
        }
    })
  })
  }

  handleTeacher(){
    this.title = "פרויקטים של תלמידים שלי";
    this.obj = "<table class='table table-striped table-bordered'><thead><tr><th>שם פרוייקט</th><th>סטאטוס</th><th>הוספת המלצה</th><th>פריט עבודה נוכחי</th></tr></thead><tbody>";
    for (var i = 0; i < this.db.projectsList.length; i++) {
      if (this.db.projectsList[i].school_contact_mail == this.db.loggedInUser.email) {
        this.obj+="<tr><td>"+this.db.projectsList[i].project_name+"</td>"
                  +"<td>"+this.db.projectsList[i].status+"</td>"
                  +"<td class='load' ><button type='button' id="+i+" class='btn btn-labeled btn-primary'>הוסף</button></td>";
        if(this.db.projectsList[i].project_file==null){
          this.obj+="</td>"+"<td>לא קיים פריט עבודה במערכת</td></tr>"
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
  })
}
}
