import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Message } from '../message';
import { User } from '../user';
import { CookieService } from 'ngx-cookie-service';
import { RouterLink, Router } from '@angular/router';

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
    this.db.getLoggedInUser().then(() => {
      this.numOfMessage = this.db.loggedInUser.messages.length;
      this.downloadMsgs();
    })
  }

  constructor(public db: DatabaseService, private cookieService: CookieService, public router: Router) { }

  downloadMsgs() {
    for (var i = 0, j = this.numOfMessage - 1;
      i < this.db.loggedInUser.messages.length; i++ , j--) {
      this.msgArray[i] = this.db.loggedInUser.messages[j];
    }
  }

  delteMessage(msg) {
    if (window.confirm('האם למחוק את ההודעה?')) {
      var i = this.db.loggedInUser.messages.length - 1 - msg;
      this.numOfMessage--;
      this.msgArray.slice(msg, 1)
      this.db.loggedInUser.messages.splice(i, 1);
      this.db.user = this.db.loggedInUser;
      this.db.updateListing(this.db.loggedInUser.email);
      this.downloadMsgs()
    }
  }

  reply(message: Message) {
    if (this.db.loggedInUser.type != 'מנהל')
      this.router.navigate(['contactUs']);
    else {
      console.log( this.cookieService.get('contactTo'))
      this.cookieService.set('contactTo', message.email);
      console.log( this.cookieService.get('contactTo'))
      this.router.navigate(['contactUs']);
    }
  }

}
