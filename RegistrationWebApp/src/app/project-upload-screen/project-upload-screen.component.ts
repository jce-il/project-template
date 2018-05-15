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
    this.fields = [
    "מתמטיקה","מדעי החיים","כימיה",
    "הנדסה/טכנולוגיה","היסטוריה",
    "מדעי הסביבה","פיזיקה","מדעי המחשב","מדעי החברה"];
    this.projectStatus = ["בחר סטאטוס מתוך הרשימה","עוד לא התחלתי את העבודה המעשית",
    "עוד לא סיימתי את העבודה המעשית ואין לי תוצאות",
    "עוד לא סיימתי את העבודה המעשית אך יש לי תוצאות חלקיות",
    "סיימתי את כל העבודה המעשית ואני בכתיבת העבודה"];
    this.project = new Project();
    this.validateForm();
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
    if (this.projectform.valid) { // no validate errors
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



  public validateForm() {
    // Limitations on fields in the registration form
    this.projectform = new FormGroup({
      'partner1': new FormControl(this.project.user1mail, [
        // my Email is required, must be in email format.
        Validators.required,
        Validators.email
      ]),
      'partner2': new FormControl(this.project.user2mail, [
        //must be in email format.
        Validators.email
      ]),
      'partner3': new FormControl(this.project.user3mail, [
        //must be in email format.
        Validators.email
      ]),
      'projectname':  new FormControl(this.project.user3mail, [
        //projectname is required.
        Validators.required
      ]),
      'email_school':  new FormControl(this.project.user3mail, [
        //Teacher Email is required, must be in email format.
        Validators.required,
        Validators.email
      ]),
      'project_field':  new FormControl(this.project.user3mail, [
        //projectname is required.
        Validators.required
      ]),
    });
  }

    // gets - link the formControls to html
    get partner1() { return this.projectform.get('partner1'); }
    get partner2() { return this.projectform.get('partner2'); }
    get partner3() { return this.projectform.get('partner3'); }
    get projectname() { return this.projectform.get('projectname'); }
    get email_school() { return this.projectform.get('email_school'); }
    get project_field() { return this.projectform.get('project_field'); }
    get location() { return this.projectform.get('location'); }
    get type() { return this.projectform.get('type'); }
    get status() { return this.projectform.get('status'); }
    get fileupload() { return this.projectform.get('fileupload'); }
    get target() { return this.projectform.get('target'); }
    get background() { return this.projectform.get('background'); }
    get description() { return this.projectform.get('description'); }
    get scope() { return this.projectform.get('scope'); }
    get inovetion() { return this.projectform.get('inovetion'); }
    get advantages() { return this.projectform.get('advantages'); }
    get retrospective() { return this.projectform.get('retrospective'); }


  //check if a field is empty
  public CheckIfEmptyField(field: string) {
    if (field == '')
      return true; // field is empty
    else
      return false;
  }


}
