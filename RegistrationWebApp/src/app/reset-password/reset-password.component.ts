import { Component, OnInit, Input} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  passReset = false; //flag to know if the button was clicked 
  user = { //holds the user input(email)
    email: ''
  };
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  resetPassword() {//on resetPassword click this method send a firebase email to the input address to reset the password.
    this.auth.resetPassword(this.user.email)
      .then(() => {
        if(!this.auth.emailError)
          this.passReset = true;
        else{
          alert("   הזן כתובת מחדש.  !כתובת דואר אלקטרוני אינה תקינה או לא קיימת במערכת")
          this.auth.emailError = false;
        }
      })// Terms to tell the user to access his e-mail box
  }

}
