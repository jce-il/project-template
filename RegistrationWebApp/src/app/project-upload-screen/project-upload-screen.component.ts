import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { UploadFileService } from '../services/upload-file.service';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FileUpload } from '../fileupload';
import { Project } from '../project';


@Component({
  selector: 'app-project-upload-screen',
  templateUrl: './project-upload-screen.component.html',
  styleUrls: ['./project-upload-screen.component.css']
})
export class ProjectUploadScreenComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  fields;
  projectStatus;
  project: Project;
  projectform: FormGroup; // tracks the value and validity state of a group of FormControl

  constructor(public db: DatabaseService, public auth: AuthService, public uploadService: UploadFileService) 
  { 
    this.fields = ["בחר תחום מתוך הרשימה",
    "מתמטיקה","מדעי החיים","כימיה",
    "הנדסה/טכנולוגיה","היסטוריה",
    "מדעי הסביבה","פיזיקה","מדעי המחשב","מדעי החברה"];
    this.projectStatus = ["בחר סטאטוס מתוך הרשימה","עוד לא התחלתי את העבודה המעשית",
    "עוד לא סיימתי את העבודה המעשית ואין לי תוצאות",
    "עוד לא סיימתי את העבודה המעשית אך יש לי תוצאות חלקיות",
    "סיימתי את כל העבודה המעשית ואני בכתיבת העבודה"];
    this.project = new Project();
  }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined; //reset ? 
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  public addProject(){
    this.project.project_file = this.currentFileUpload; // assigned file in project field
    this.db.addProjectToDB(this.project);
    this.db.getUser(this.project.user2mail,this.project.user3mail);
    this.db.getProjectMetaData();
    this.db.setMetaData();
    setTimeout(() =>{
      var proj_id = this.db.getProjectID(this.project.project_name);
      this.db.selectedUser[0].project = proj_id;
      this.db.selectedUser[1].project = proj_id;  
      //console.log(this.db.selectedUser[1].project);   
      this.db.asignProjectToUser(this.db.selectedUser[0].email,0);
      this.db.asignProjectToUser(this.db.selectedUser[1].email,1);
    },4000);
  }
}
