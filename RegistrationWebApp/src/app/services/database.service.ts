import { Injectable } from '@angular/core';
import { AngularFirestore } from'angularfire2/firestore';
import {User} from '../user';
@Injectable()
export class DatabaseService {

  private dataCollections;
  public registeredUsers;
  private user : User;
  public loggedInUserUID : string;
  public loggedInUser : User;
  public loggedIn : boolean; //check if this is the right way to do
  constructor(private afs: AngularFirestore) 
  { 
    const settings = {timestampsInSnapshots: true};
    afs.app.firestore().settings(settings);
    this.dataCollections = afs.collection<any>('usersInfo');
    this.registeredUsers = "";
    this.loggedIn = false;
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
        this.registeredUsers += "   email:   "+ collection[i].email+ "\n   password:   "+ collection[i].password+"\n   uid:   "+collection[i].uid+"   \n\n   ";
      }
    })
  }

  public getLoggedInUser(){

    this.dataCollections.valueChanges().subscribe(collection=>{
    for(var i = 0 ; i < collection.length; i++)
    {
      if(collection[i].uid === this.loggedInUserUID)
      {
        this.loggedInUser = collection[i];
        this.loggedIn = true;
      }
    }        
    })
  }



}
