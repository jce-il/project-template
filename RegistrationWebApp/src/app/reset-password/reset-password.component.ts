import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  passReset = false; 
  user = {
    email: ''
  };

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  resetPassword() {
    this.auth.resetPassword(this.user.email)
      .then(() => this.passReset = true);
  }

}
