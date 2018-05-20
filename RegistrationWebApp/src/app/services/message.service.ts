import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { DatabaseService } from '../services/database.service';
import { Message } from '../message';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class MessageService {
  //private subject = new Subject<any>();


  constructor(public db: DatabaseService) {
   
   }

 
}
 
       

  /*

  sendMessage(message: string) {
    this.subject.next({ text: message });
}

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
*/



