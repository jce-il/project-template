import { Component } from '@angular/core';
import {User} from '../user'

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent{
  types = ['student', 'teacher', 'checker', 'manager'];
  user = new User(this.types[0], '', '', '', '', '')

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }
}
