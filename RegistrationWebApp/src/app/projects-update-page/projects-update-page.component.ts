import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { UploadFileService } from '../services/upload-file.service';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FileUpload } from '../fileupload';
import { Project } from '../project';
import { RouterLink, Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'firebase';
import * as $ from "jquery"
import { forEach } from '@firebase/util';
import { element } from 'protractor';

@Component({
  selector: 'app-projects-update-page',
  templateUrl: './projects-update-page.component.html',
  styleUrls: ['./projects-update-page.component.css']
})
export class ProjectsUpdatePageComponent implements OnInit {
  title: string;
  isStudent: boolean;
  selectedFiles: FileList;
  selected_recommendation_files: FileList;
  currentFileUpload: FileUpload;
  current_recommendation_FileUpload: FileUpload;
  project: Project;
  projectform: FormGroup; // tracks the value and validity state of a group of FormControl
  projectError: boolean; //if true -> there is an error in the project form
  progress: { percentage: number } = { percentage: 0 };
  fields;
  projectField: string; // if the student is selected "another" field of research, we will use this
  projectStatus;
  user_projects = ['מתוך רשימה']; // for drop down list
  selectedWork = 'מתוך רשימה'; //for drop down list
  user_project_objects = [];
  userFile: FileUpload;
  recommendation_selected = false;
  file_project_selected = false;
  researchStatus;
  modelStatus;
  routerId;
  send: string


  constructor(public db: DatabaseService, public auth: AuthService, public uploadService: UploadFileService, public router: Router, private cookieService: CookieService, private route: ActivatedRoute) {
    this.send = "שלח פרוייקט לתחרות";
    this.fields = [
      "מתמטיקה", "מדעי החיים", "כימיה",
      "הנדסה/טכנולוגיה", "היסטוריה",
      "מדעי הסביבה", "פיזיקה", "מדעי המחשב", "מדעי החברה", "אחר"];
    this.projectStatus = ["עוד לא התחלתי את העבודה המעשית",
      "עוד לא סיימתי את העבודה המעשית ואין לי תוצאות",
      "עוד לא סיימתי את העבודה המעשית אך יש לי תוצאות חלקיות",
      "סיימתי את כל העבודה המעשית ואני בכתיבת העבודה"];
    this.researchStatus = [
      "לא התחלתי ניסויים",
      "התחלתי",
      "יש תוצאות",
      "יש אנליזה של תוצאות"
    ];
    this.modelStatus = [
      "אין",
      "לא התחלתי תכנון",
      "יש תכנון",
      "יש דגם ראשוני",
      "יש דגם עובד",
      "יש מוצר סופי"
    ];
    this.project = new Project();
    this.validateForm();
    this.projectError = false; // default- no registration form errors
  }

  ngOnInit() {
    this.cookieService.set('page','updateScreen');
    this.route.params.subscribe((params: Params) => {
      this.routerId = params['id'];
    });
    this.db.setMetaData();
    this.db.loggedInUserUID = this.cookieService.get('User uid');
    this.db.loggedIn = this.cookieService.get('User login status');
    this.db.getLoggedInUser().then(() => {
      if (this.db.loggedInUser.project == undefined)
        this.router.navigate(['homepage']);
      if (this.db.loggedInUser.type == 'תלמיד') {
        this.isStudent = true;
        this.title = "עדכון או צפיה בפרטי פרויקט"
      }
      else {
        this.isStudent = false;
        if (this.db.loggedInUser.type == 'מורה')
          this.title = "פרויקטים של תלמידים שלי"
        else if (this.db.loggedInUser.type == "בודק") {
          this.title = "פרוייקטים לבדיקה"
          this.send = "שלח בדיקה"
        }
        else if (this.db.loggedInUser.type == "מנהל") {
          this.title = "פרוייקטים"
          this.send = "עדכן פרוייקט"
        }
      }
      this.db.getProjectMetaData().subscribe((val) => {
        this.db.projectsList = val;
        var j = 1;
        if (this.isStudent) {
          for (var i = 0; i < this.db.projectsList.length; i++) {
            if (this.db.projectsList[i].id == this.db.loggedInUser.project) {
              this.project = this.db.projectsList[i];
              this.user_projects[j++] = this.project.project_name;
              this.userFile = this.project.project_file;
              this.uploadService.basePath = this.project.project_name;
            }
          }
        }
        else {
          if (this.db.loggedInUser.type == 'מורה') {
            for (var i = 0; i < this.db.projectsList.length; i++) {
              if (this.db.projectsList[i].school_contact_mail == this.db.loggedInUser.email) {
                this.user_projects[j++] = this.db.projectsList[i].project_name;
                this.user_project_objects.push(this.db.projectsList[i]);
              }
            }
          }
          else if (this.db.loggedInUser.type == 'בודק') {
            for (var i = 0; i < this.db.projectsList.length; i++) {
              if (this.db.projectsList[i].checkerMail == this.db.loggedInUser.email) {
                this.user_projects[j++] = this.db.projectsList[i].project_name;
                this.user_project_objects.push(this.db.projectsList[i]);
              }
            }
          }

          else if (this.db.loggedInUser.type == 'מנהל') {
            for (var i = 0; i < this.db.projectsList.length; i++) {
              this.user_projects[j++] = this.db.projectsList[i].project_name;
              this.user_project_objects.push(this.db.projectsList[i]);
            }
          }


        }
        if (this.routerId != undefined) {
          this.selectedWork = this.routerId;
          this.onChangeObj();
        }
      })
    });
  }

  onChangeObj() {
    for (var i = 0; i < this.user_project_objects.length; i++) {
      if (this.selectedWork == this.user_project_objects[i].project_name) {
        this.project = this.user_project_objects[i];
        this.uploadService.basePath = this.project.project_name;
      }
    }
  }

  //Holds the selected file from the form
  selectFile(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.item(0).size > 5242880) {
      this.cancelSelectFile();
      alert("גודל הקובץ חייב להיות עד 5 מגה בייט")
      return;
    }
    this.file_project_selected = true;
  }

  cancelSelectFile() {
    this.selectedFiles = null;
    this.file_project_selected = false;
  }

  cancelSelectedRecommendation() {
    this.selected_recommendation_files = null;
    this.recommendation_selected = false;
  }
  //Uploads the selected file to firebase storage and deletes the previous one
  upload() {
    if (this.userFile != undefined)
      this.uploadService.deleteFileUpload(this.userFile);
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress).then(() => {
      this.file_project_selected = false;
    })
  }

  selectRecommendationFile(event) {
    if (this.selected_recommendation_files.item(0).size > 5242880) {
      this.cancelSelectedRecommendation();
      alert("גודל הקובץ חייב להיות עד 5 מגה בייט")
      return;
    }
    this.selected_recommendation_files = event.target.files;
    this.recommendation_selected = true;
  }

  recommendationUpload() {
    const file = this.selected_recommendation_files.item(0);
    this.selected_recommendation_files = undefined;
    this.current_recommendation_FileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.current_recommendation_FileUpload, this.progress).then(() => {
      this.project.recommendation_file = this.current_recommendation_FileUpload;
      this.db.project = this.project;
      this.db.updateProjectListing(this.project.project_name);
      this.recommendation_selected = false;
    })
  }

  //collects all the info from the 'add project form' and sets it with all the needed DB connections in the database
  public addProject() {
    if (this.CheckIfEmptyField(this.project.user2mail)) { // 1 participant
      this.projectform.get('partner2').clearValidators();
      this.projectform.get('partner2').updateValueAndValidity(); //clear error
    }
    if (this.CheckIfEmptyField(this.project.user3mail)) {//2 participants
      this.projectform.get('partner3').clearValidators();
      this.projectform.get('partner3').updateValueAndValidity(); // clear error
    }
    if (this.project.project_field != "אחר") { //project_field != other
      this.projectform.get('other').clearValidators();
      this.projectform.get('other').updateValueAndValidity(); //clear error
    }
    else {
      this.project.project_field = this.projectField;
    }

    if (this.project.isMentors == true || this.CheckIfEmptyField(this.project.mentor1.email)) {
      this.projectform.get('mailmentor1').clearValidators();
      this.projectform.get('mailmentor1').updateValueAndValidity(); //clear error
    }
    if (this.project.isMentors == true || this.CheckIfEmptyField(this.project.mentor1.phone)) {
      this.projectform.get('phonementor1').clearValidators();
      this.projectform.get('phonementor1').updateValueAndValidity(); //clear error
    }
    if (this.project.isMentors == true || this.CheckIfEmptyField(this.project.mentor2.email)) {
      this.projectform.get('mailmentor2').clearValidators();
      this.projectform.get('mailmentor2').updateValueAndValidity(); //clear error
    }
    if (this.project.isMentors == true || this.CheckIfEmptyField(this.project.mentor2.phone)) {
      this.projectform.get('phonementor2').clearValidators();
      this.projectform.get('phonementor2').updateValueAndValidity(); //clear error
    }
    if (this.project.isMentors == true || this.CheckIfEmptyField(this.project.mentor3.email)) {
      this.projectform.get('mailmentor3').clearValidators();
      this.projectform.get('mailmentor3').updateValueAndValidity(); //clear error
    }
    if (this.project.isMentors == true || this.CheckIfEmptyField(this.project.mentor3.phone)) {
      this.projectform.get('phonementor3').clearValidators();
      this.projectform.get('phonementor3').updateValueAndValidity(); //clear error
    }

    if (!this.projectform.valid) { // validate errors
      this.projectError = true; // form error
      return;
    }
    this.projectError = false;
    this.checkSubmission();
    /*This part to the following:
    1. Gets the selected file to upload from the form anf sets in into the project_file property in the project object
    2. Collects all inserted info that was inserted into the form and then uploads the project to FB using addProjectToDB() func
    3. Sets 3 users to the selectedUser property by the e-mail addresses that were given in the upload form
    4. Gets project table meta data and sets the returned value to the projectsList property
    5. Gets current project listing id in order to connect it to the users that were selected
    6. updates teacher and project properties in the selectedUser array to be the connection between teacher and student(by mail)
       and between project and students (by the project listing id)
    7. FINALLY, updates the updated selected users using the asignProjectToUser() function    
    */
    this.project.project_file = this.currentFileUpload; // assigned file in project field
    this.db.getUser(this.project.user1mail, this.project.user2mail, this.project.user3mail).then(() => {
      if (this.db.existsUsers[0] == false) {
        alert("המייל שלי' שהוזן אינו קיים במערכת'")
        this.projectError = true;
        return;
      }
      if (!this.CheckIfEmptyField(this.project.user2mail) && this.db.existsUsers[1] == false) {
        alert("כתובת מייל השותף השני אינה קיימת במערכת")
        this.projectError = true;
        return;
      }
      if (!this.CheckIfEmptyField(this.project.user3mail) && this.db.existsUsers[2] == false) {
        alert("כתובת מייל השותף השלישי אינה קיימת במערכת")
        this.projectError = true;
        return;
      }
      this.db.project = this.project;
      this.db.updateProjectListing(this.project.project_name);
      this.db.getProjectMetaData().subscribe(val => {
        this.db.projectsList = val;
        var proj_id = this.db.getProjectID(this.project.project_name);
        if (this.db.existsUsers[1]) {
          this.db.selectedUser[1].project = proj_id;
        }
        if (this.db.existsUsers[2]) {
          this.db.selectedUser[2].project = proj_id;
        }
        this.db.asignProjectToUser(this.db.selectedUser[0].email, 0);
        if (this.db.existsUsers[1]) {
          this.db.asignProjectToUser(this.db.selectedUser[1].email, 1);
        }
        if (this.db.existsUsers[2]) {
          this.db.asignProjectToUser(this.db.selectedUser[2].email, 2);
        }
      });
      alert(" העבודה עודכנה בהצלחה ");
      this.router.navigate(['homepage']);
    });
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
      'projectname': new FormControl(this.project.user3mail, [
        //projectname is required.
        Validators.required
      ]),
      'email_school': new FormControl(this.project.user3mail, [
        // must be in email format.
        //Validators.required,
        Validators.email
      ]),
      'project_field': new FormControl(this.project.user3mail, [
        //projectname is required.
        Validators.required
      ]),
      'other': new FormControl(this.projectField, [
        //projectname is required.
        Validators.required
      ]),
      'mailmentor1': new FormControl(this.projectField, [
        //projectname is required.
        Validators.email
      ]),
      'mailmentor2': new FormControl(this.projectField, [
        //projectname is required.
        Validators.email
      ]),
      'mailmentor3': new FormControl(this.projectField, [
        //projectname is required.
        Validators.email
      ]),
      'phonementor1': new FormControl(this.projectField, [
        //phone number is required, must be 9-13 digits (only numbers).
        Validators.pattern("0[0-9-]*"),
        Validators.minLength(9),
        Validators.maxLength(13)
      ]),
      'phonementor2': new FormControl(this.projectField, [
        //phone number is required, must be 9-13 digits (only numbers).
        Validators.pattern("0[0-9-]*"),
        Validators.minLength(9),
        Validators.maxLength(13)
      ]),
      'phonementor3': new FormControl(this.projectField, [
        //phone number is required, must be 9-13 digits (only numbers).
        Validators.pattern("0[0-9-]*"),
        Validators.minLength(9),
        Validators.maxLength(13)
      ]),
      'status': new FormControl(this.projectField, [
        //status project is required.
        Validators.required
      ]),
      // 'typeo': new FormControl(this.projectField, [
      //   //type project is required.
      //   Validators.required
      // ]),
    });
  }

  // gets - link the formControls to html
  get partner1() { return this.projectform.get('partner1'); }
  get partner2() { return this.projectform.get('partner2'); }
  get partner3() { return this.projectform.get('partner3'); }
  get projectname() { return this.projectform.get('projectname'); }
  get email_school() { return this.projectform.get('email_school'); }
  get project_field() { return this.projectform.get('project_field'); }
  get other() { return this.projectform.get('other'); }
  get mailmentor1() { return this.projectform.get('mailmentor1'); }
  get phonementor1() { return this.projectform.get('phonementor1'); }
  get mailmentor2() { return this.projectform.get('mailmentor2'); }
  get phonementor2() { return this.projectform.get('phonementor2'); }
  get mailmentor3() { return this.projectform.get('mailmentor3'); }
  get phonementor3() { return this.projectform.get('phonementor3'); }
  get status() { return this.projectform.get('status'); }

  //check if a field is empty
  public CheckIfEmptyField(field: string) {
    if (field == undefined || field == '')
      return true; // field is empty
    else
      return false;
  }

  // set submission attribute to the project.
  public checkSubmission() {
    var data_fields = $(".data");
    for (var i = 0; i < 13; i++) {
      if (this.CheckIfEmptyField(data_fields[i].value)) {
        this.project.submission = false;
        return;
      }
    }
    this.project.submission = true;
  }

}
