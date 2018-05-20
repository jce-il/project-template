import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Message } from '../message';

@Component({
  selector: 'app-msg-screen',
  templateUrl: './msg-screen.component.html',
  styleUrls: ['./msg-screen.component.css']
})
export class MsgScreenComponent implements OnInit {

  msgArray: Message[] = new Array();
  constructor(public db: DatabaseService) { }

  ngOnInit() {

    this.db.getLoggedInUser().then(() => {
      this.downloadMsgs();
    });
    
  }

  downloadMsgs()
  {
    for(var i = 0;i<this.db.loggedInUser.messages.length;i++)
    {
      this.msgArray[i] = this.db.loggedInUser.messages[i];
    }
  }

}
