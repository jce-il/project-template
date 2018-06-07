import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Message } from '../message';
import { User } from '../user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-msg-screen',
  templateUrl: './msg-screen.component.html',
  styleUrls: ['./msg-screen.component.css']
})
export class MsgScreenComponent implements OnInit {

  msgArray: Message[] = new Array();

  ngOnInit() {
    this.db.loggedInUserUID = this.cookieService.get('User uid');
    this.db.loggedIn = this.cookieService.get('User login status');
    this.db.getLoggedInUser().then(()=> {
      this.downloadMsgs();
    })
  }

  constructor(public db: DatabaseService,private cookieService: CookieService) { }

 

  downloadMsgs()
  {
    for(var i = 0,j=this.db.loggedInUser.messages.length-1;
      i<this.db.loggedInUser.messages.length;i++,j--)
    {
      this.msgArray[i] = this.db.loggedInUser.messages[j];
    }
  }

  delteMessage(msg){
    console.log(msg)
    msg=this.db.loggedInUser.messages.length-1-msg;
    console.log(this.db.loggedInUser.messages)
    console.log(this.db.loggedInUser.messages[msg])
    this.db.loggedInUser.messages.splice(msg,1);
    console.log(this.db.loggedInUser.messages)
      this.db.updateListing(this.db.loggedInUser.email);
      this.downloadMsgs()
  }

}
