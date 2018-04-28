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
  user = new User(this.types[0])
  userform: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  ngOnInit(): void {
    this.userform = new FormGroup({
      'firstname': new FormControl(this.user.firstName, [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("[א-ת]+")
      ]),
      'lastname': new FormControl(this.user.lastName, [
        Validators.required
      ]),
      'email': new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      'engfname': new FormControl(this.user.engFname, [
        Validators.pattern("[a-zA-Z ]*")
      ]),
      'phone' : new FormControl("", [
        Validators.pattern("[0-9]*"),
        Validators.minLength(8),
        Validators.maxLength(11)
      ])
    });
  }

  get firstname() { return this.userform.get('firstname'); }
  get lastname() { return this.userform.get('lastname'); }
  get email() { return this.userform.get('email'); }
  get engfname() { return this.userform.get('engfname'); }
  get phone() { return this.userform.get('phone'); }


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
