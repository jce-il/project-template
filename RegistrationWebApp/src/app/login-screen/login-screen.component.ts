import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { CookieService } from 'ngx-cookie-service';

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
  signInVal = 'כניסה'
  constructor(public auth: AuthService, public fb: FormBuilder, public router: Router, public db: DatabaseService, private cookieService: CookieService) { }

  ngOnInit() {
    this.buildForm();
    if (this.cookieService.get('managerLoggedIn') == 'true')
      this.router.navigate(['manager']);
    else if (this.cookieService.get('checkerLoggedIn') == 'true')
      this.router.navigate(['checker']);
    else if (this.cookieService.get('User login status') == 'true')
      this.router.navigate(['homepage']);
  }

  signIn() { //enables the sign in button function
    this.signInVal = 'מתחבר...'
    this.auth.signIn(this.userForm.value['email'], this.userForm.value['password']) //using the auth service
      .then((res) => {
        this.cookieService.set('User uid', res.uid);
        this.cookieService.set('User login status', 'true');
        this.db.loggedInUserUID = res.uid
        this.db.loggedIn = 'true';
        this.db.getLoggedInUser().then(() => {
          if (this.db.loggedInUser.type == 'בודק') {
            this.cookieService.set('checkerLoggedIn', 'true');
            this.router.navigate(['checker']);
          }
          else if (this.db.loggedInUser.type == 'מנהל') {
            this.cookieService.set('managerLoggedIn', 'true');
            this.router.navigate(['manager'])
          }
          else
            this.router.navigate(['homepage'])
        })
      })
      .catch((err) => {
        this.signInVal = 'כניסה'
        this.logInError = true
      }
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
