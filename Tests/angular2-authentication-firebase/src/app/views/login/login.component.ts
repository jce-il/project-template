import { Component, OnInit ,Input} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formCtrl: NgForm;
  user = {
    email: '',
    password: ''
 };

  constructor(private authService: AuthService) { }

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password)
       .then((res) => {
          console.log(res);

       })
       .catch((err) => console.log('error: ' + err));
 }
  ngOnInit() {
  }

}
