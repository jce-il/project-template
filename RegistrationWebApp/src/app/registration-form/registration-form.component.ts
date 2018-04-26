import {User} from '../user'
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database.service';
import { AngularFirestore } from'angularfire2/firestore';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent{
  types = ['student', 'teacher', 'checker', 'manager'];
  user = new User(this.types[0], '', '', '', '', '')

  submitted = false;

  constructor(public db : DatabaseService,private auth: AuthService) { }

  onSubmit() { this.submitted = true; }

  get diagnostic() { return JSON.stringify(this.user); }

  public registerUser()
  {
    this.auth.emailSignUp(this.user.email,this.user.password)
    .then((res) => {
      this.user.uid=res.uid;
      this.db.addUserToDB(this.user);
    })
  }

  public printDBdata()
  {
    this.db.getAllDBUsers();
  }
}
