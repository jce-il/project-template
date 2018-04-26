import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule, FormGroup,FormBuilder ,Validators,ReactiveFormsModule  } from '@angular/forms';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  logInError=false;
  userForm: FormGroup;
  passReset = false; 
  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };

  constructor(private auth: AuthService ,private fb: FormBuilder,private router: Router) {}

  ngOnInit() {
    this.buildForm();
  }

  signIn() {
    this.auth.signIn(this.userForm.value['email'], this.userForm.value['password'])
       .then((res) => {
         this.router.navigate(['loginScreen'])
       })
       .catch((err) =>
       this.logInError=true
      );
 }

 resetPassword() {
  this.auth.resetPassword(this.userForm.value['email'])
    .then(() => this.passReset = true);
}

  buildForm() {
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
