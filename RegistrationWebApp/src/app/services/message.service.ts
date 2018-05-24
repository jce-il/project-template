import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Message } from '../message';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class MessageService {
 
  public currentTable = [{name:"teacher",flg:false},{name:"checker",flg:false}];
  public routName:string;
  constructor(public db: DatabaseService) {
    this.db.getMetaData().subscribe(res => {
      this.db.usersList = res;
    });

    this.db.getProjectMetaData().subscribe(res => {
      this.db.projectsList=res;
     // console.log(this.db.projectsList);
    });
   }

   addMsgToUser(email: string,msg: Message){
    this.db.getUser(email,"","","").then(() => {
        this.db.user =this.db.selectedUser[0]; 
        this.db.user.messages.push(msg);
        this.db.updateListing(email);
    })
    .catch(err =>{
      alert("כתובת דואר אלקטרוני שהזנת אינה במערכת");// error message
    })
}
    
    getCurrentTable(){
      this.currentTable.forEach(element => {
        if(element.flg==true){
         // console.log(typeof(element.name));
            this.routName = element.name
            //return element.name;
      }
    });
    }

    setCurrentTable(name:string,flg:boolean){
      this.currentTable.forEach(element => {
        if(element.name==name){
            element.flg=true;
      }
    });
    }


}
 