import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Message } from '../message';
import { MessageService } from '../services/message.service'
import { DatabaseService } from '../services/database.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  form: FormGroup;
  msg: Message;
  date: Date = new Date();
  today;
  contact_emails = [];
  display_contacts = ['כל המשתמשים',
"תלמידים",
"מורים",
"בודקים",
"תלמידים שהגישו עבודה",
"תלמידים ללא עבודה",
"תלמידים בתחרות",
"תלמידים לא בתחרות",
"- - - - - - - - - - - - - - - - - - - - -"
]

  selected_contact="";


  constructor(private fb: FormBuilder, private msgService: MessageService, private cookieService: CookieService,
    public db: DatabaseService, public router: Router) { this.createForm(); }

  ngOnInit() {
    this.db.loggedInUserUID = this.cookieService.get('User uid');
    this.db.loggedIn = this.cookieService.get('User login status');
    this.db.getLoggedInUser().then(()=>{
      this.db.getMetaData().subscribe((res) => {
      this.db.usersList = res;
      var j = 0;
      if (this.db.loggedInUser.type != 'מנהל') {
        for (var i = 0; i < this.db.usersList.length; i++) {
          if (this.db.usersList[i].type == 'מנהל')
            this.contact_emails[j++] = this.db.usersList[i].email;
        }
      }
      else{
        j=9;
        for (var i = 0; i<this.db.usersList.length; i++, j++){
          this.display_contacts[j]=  ""+ this.db.usersList[i].email +" - " + this.db.usersList[i].firstName + " "+this.db.usersList[i].lastName ;
        }
      }
    });
  });
    
  }


  createForm() { //this function build the form and check input validation
    this.form = this.fb.group({
      name: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  setContactsByType(type){
    for (var i = 0, j=0; i < this.db.usersList.length; i++){
      if (this.db.usersList[i].type == type){
        this.contact_emails[j++] = this.db.usersList[i].email
      }
    }
  }

  setContactsByProject(flag){
    for (var i = 0, j=0; i < this.db.usersList.length; i++){
      if ( flag == 1 && this.db.usersList[i].type =='תלמיד' && this.db.usersList[i].project != undefined){
        this.contact_emails[j++] = this.db.usersList[i].email
      }
      else if (flag == 0 && this.db.usersList[i].type =='תלמיד' && this.db.usersList[i].project == undefined){
        this.contact_emails[j++] = this.db.usersList[i].email
      }
    }
  }

  setContactsByComp(flag){
    for (var i = 0, j=0; i < this.db.usersList.length; i++){
      if ( flag == 1 && this.db.usersList[i].type =='תלמיד' && this.db.usersList[i].project.inCompetition != true){
        this.contact_emails[j++] = this.db.usersList[i].email
      }
      else if (flag == 0 && this.db.usersList[i].type =='תלמיד' && this.db.usersList[i].project.inCompetition == true){
        this.contact_emails[j++] = this.db.usersList[i].email
      }
    }
  }

  setContactsList(){
    switch(this.selected_contact){
      case "כל המשתמשים":
      {
        for (var i = 0, j=0; i < this.db.usersList.length; i++){
          if (this.db.usersList[i].type != 'מנהל'){
            this.contact_emails[j++] = this.db.usersList[i].email
          }
        }
        break;
      }
    case "תלמידים":
      {
        this.setContactsByType('תלמיד')
        break;
      }
      case "מורים":
      {
        this.setContactsByType('מורה')
        break;
      }
      case "בודקים":
      {
        this.setContactsByType('בודק')
        break;
      }
      case "תלמידים שהגישו עבודה":
      {
        this.setContactsByProject(1);
        break;
      }
      case "תלמידים ללא עבודה":
      {
        this.setContactsByProject(0);
        break;
      }
      case "תלמידים בתחרות":
      {
        this.setContactsByComp(1)
        break;
      }
      case "תלמידים לא בתחרות":
      {
        this.setContactsByComp(0)
        break;
      }
      
      default:
      {
        var selection = this.selected_contact;
        var space = selection.indexOf(' ');
        selection = selection.slice(0,space);
        this.contact_emails[0] = selection;
      }
    }

  }

  onSubmit() {//this method take the user input and save the input in an object
    const { name, email, message } = this.form.value;
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;//an html string so the admin could view the user's message detailes.
    let formRequest = { name, email, message, date, html };
    this.today = this.date.getDate().toString() + "/" + (this.date.getMonth() + 1).toString() + "/" + this.date.getFullYear().toString();
    if (this.db.loggedInUser.type == 'מנהל'){
      this.setContactsList();
    }
    this.msg = new Message(name, message, this.today);
    this.msg.email = this.db.loggedInUser.email;
    this.msg.name = this.db.loggedInUser.firstName;
    this.msg.last_name = this.db.loggedInUser.lastName;
    this.msgService.addMsgToUser(this.contact_emails, this.msg);
    this.form.reset();
  }//NOT FINISHED YET!!!--need to ask rony!


  /*kaki(){
      this.router.navigate(['tablePage']);
  }
*/

}


