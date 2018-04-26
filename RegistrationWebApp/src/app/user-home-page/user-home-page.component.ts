import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database.service';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {

  constructor(public db : DatabaseService) { }

  ngOnInit() {
    this.db.getAllDBUsers();
    
  }


}
