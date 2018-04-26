import {User} from '../user'
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database.service';
import { AngularFirestore } from'angularfire2/firestore';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, FormGroup,FormControl, FormBuilder ,Validators,ReactiveFormsModule  } from '@angular/forms';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent{
  types = ['student', 'teacher', 'checker', 'manager'];
  user = new User(this.types[0], '', '', '', '', '')
  userform: FormGroup;

  ngOnInit(): void {
    this.userform = new FormGroup({
      'firstName': new FormControl(this.user.firstName, [
        Validators.required,
        Validators.minLength(2)
      ]),
      'lastName': new FormControl(this.user.lastName, [
        Validators.required
      ]) 
    });
  }

  get firstname() { return this.userform.get('firstName'); }
  get lastname() { return this.userform.get('lastName'); }


  submitted = false;

  constructor(public db : DatabaseService,private auth: AuthService) { }

  onSubmit() { this.submitted = true; }

  //get diagnostic() { return JSON.stringify(this.user); }

  public registerUser()
  {
    this.auth.emailSignUp(this.user.email,this.user.password)
    .then((res) => {
      this.user.uid=res.uid;
      this.db.addUserToDB(this.user);
    })
  }
}
