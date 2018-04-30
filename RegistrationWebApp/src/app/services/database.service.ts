import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreDocument } from'angularfire2/firestore';
import {User} from '../user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {

  public dataCollections;
  public registeredUsers;
  public user : User;
  public loggedInUserUID : string;
  public loggedInUser : User;
  public loggedIn : boolean; //check if this is the right way to do
  listingDoc: AngularFirestoreDocument<User>;
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

  updateListing(email: string) 
  {
      var docId;
      var updatedUser;
      this.afs.collection("usersInfo").snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }).subscribe((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              if(doc.email == email)
              {
                this.listingDoc = this.afs.doc(`usersInfo/${doc.id}`);
                updatedUser = new User (true,'this is just a check');
                this.listingDoc.update(JSON.parse(JSON.stringify(updatedUser)));
              }
          });
      });
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
