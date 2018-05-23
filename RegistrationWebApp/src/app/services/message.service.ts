import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Message } from '../message';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class MessageService {
  //private subject = new Subject<any>();


  constructor(public db: DatabaseService) {
    this.db.getMetaData().subscribe(res => {
      this.db.usersList = res;
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
 
}
 