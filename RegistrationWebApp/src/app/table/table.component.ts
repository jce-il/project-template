import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service'


export const CHARACTERS: any[]=[];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit {

  projectNames: string[] = new Array();
  obj:string = "{kakai:tututhtuh}";

  constructor(private msgService: MessageService) { }

  ngOnInit() {
  this.msgService.getCurrentTable();
   switch(this.msgService.routName)
   {
     case "teacher":
    {
      this.msgService.setCurrentTable("teacher",false);
      this.handleTeacher();
      break;
    }
     case "checker":
     {
      this.msgService.setCurrentTable("checker",false);
      this.handleTeacher();
      break;
     }
   }
  }

  handleTeacher(){
    CHARACTERS.push(this.obj);
    console.log("lmdmdkmd   "+CHARACTERS);
  }

}
