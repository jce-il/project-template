<<<<<<< HEAD
import { Component } from '@angular/core';
import {User} from '../user'
=======
import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database.service';
import { AngularFirestore } from'angularfire2/firestore';
>>>>>>> 903a041623cea12e9e9aa099a70bc8d2be220460

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent{
  types = ['student', 'teacher', 'checker', 'manager'];
  user = new User(this.types[0], '', '', '', '', '')

<<<<<<< HEAD
  submitted = false;
=======
  constructor(public db : DatabaseService) { }
>>>>>>> 903a041623cea12e9e9aa099a70bc8d2be220460

  onSubmit() { this.submitted = true; }

<<<<<<< HEAD
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }
=======
  public onClick()
  {
    this.db.addData();
  }

  public onPrint()
  {
    this.db.getData();

  }

>>>>>>> 903a041623cea12e9e9aa099a70bc8d2be220460
}
