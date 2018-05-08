import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../services/database.service';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  logInError = false;
  userForm: FormGroup;
  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };

  constructor(public auth: AuthService, public fb: FormBuilder, public router: Router, public db: DatabaseService) { }

  ngOnInit() {
    this.buildForm(); 
  }

  signIn() { //enables the sign in button function
    this.auth.signIn(this.userForm.value['email'], this.userForm.value['password']) //using the auth service
      .then((res) => {
        this.db.loggedInUserUID = res.uid; //takes logged in user UID
        this.auth.currentUser = res;
        this.router.navigate(['homepage'])
      })
      .catch((err) =>
        this.logInError = true
      );
  }

  buildForm() { //form validation function - validates user input
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
    });
  }
}
