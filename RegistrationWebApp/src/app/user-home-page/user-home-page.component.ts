import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {

  constructor(private db : DatabaseService,private auth: AuthService) { }

  ngOnInit() {
    this.db.registeredUsers = '';
    this.db.getAllDBUsers();
  }

}
