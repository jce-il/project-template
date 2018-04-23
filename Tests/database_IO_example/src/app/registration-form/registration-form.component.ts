import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database.service';
import { AngularFirestore } from'angularfire2/firestore';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  constructor(public db : DatabaseService) { }

  ngOnInit() {
  }

  public onClick()
  {
    this.db.addData();
  }

  public onPrint()
  {
    this.db.getData();

  }

}
