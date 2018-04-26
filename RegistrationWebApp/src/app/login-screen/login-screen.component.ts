import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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

  userForm: FormGroup;
  passReset = false; 
  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
  };

  constructor(private auth: AuthService ,private fb: FormBuilder,private router: Router) {}

  ngOnInit() {
    this.buildForm();
  }

  signIn() {
    this.auth.signIn(this.userForm.value['email'], this.userForm.value['password'])
       .then((res) => {
         alert(res.uid);
         this.router.navigate(['registrationForm'])
       })
       .catch((err) => console.log('error: ' + err));
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
