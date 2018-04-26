import { Injectable } from '@angular/core';
import { AngularFirestore } from'angularfire2/firestore';
import {User} from '../user';
@Injectable()
export class DatabaseService {

  private dataCollections;
  private registeredUsers;
  private user : User;

  constructor(private afs: AngularFirestore) 
  { 
    this.dataCollections = afs.collection<any>('usersInfo');
    this.registeredUsers = "";
  }

  public addUserToDB(user:User)
  {
    this.dataCollections.add(JSON.parse(JSON.stringify(user)));
  }

  public getAllDBUsers()
  {
    this.dataCollections.valueChanges().subscribe(collection=>{
      for(var i = 0 ; i < collection.length; i++)
      {
        this.registeredUsers += "email: "+ collection[i].email+ " password:"+ collection[i].password+"uid: "+collection[i].uid+"\n";
      }
      alert(this.registeredUsers);
      this.registeredUsers="";
    })
  }



}
