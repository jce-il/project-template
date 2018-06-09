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
  numOfMessage;

  ngOnInit() {
    this.db.loggedInUserUID = this.cookieService.get('User uid');
    this.db.loggedIn = this.cookieService.get('User login status');
    this.db.getLoggedInUser().then(()=> {
      this.numOfMessage = this.db.loggedInUser.messages.length;
      this.downloadMsgs();
    })
  }

  constructor(public db: DatabaseService,private cookieService: CookieService) { }

  downloadMsgs()
  {
    for(var i = 0,j=this.numOfMessage-1;
      i<this.db.loggedInUser.messages.length;i++,j--)
    {
      this.msgArray[i] = this.db.loggedInUser.messages[j];
    }
  }

  delteMessage(msg){
    console.log(msg)
    var i=this.db.loggedInUser.messages.length-1-msg;
    console.log(this.db.loggedInUser.messages)
    console.log(this.db.loggedInUser.messages[i])
    this.numOfMessage--;
    this.msgArray.slice(msg,1)
    this.db.loggedInUser.messages.splice(i,1);
    console.log(this.db.loggedInUser.messages)
    this.db.user = this.db.loggedInUser;
      this.db.updateListing(this.db.loggedInUser.email);
      this.downloadMsgs()
  }

}
