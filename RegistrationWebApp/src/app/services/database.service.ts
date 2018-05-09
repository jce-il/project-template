import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {

  public dataCollections; //will hold the DB collection table that is stored in the firebase 
  public registeredUsers; //a string that holds information that was collected from getAllDBUsers() function
  public user: User; //will hold the data that was collected from a user that wants to register to the website
  public loggedInUserUID: string; //only holds logged in users id
  public loggedInUser: User; // holds logged in user info 
  public loggedIn: boolean; //check if this is the right way to do
  listingDoc: AngularFirestoreDocument<User>; //holds FB listing for update operation

  constructor(private afs: AngularFirestore) {
    //==========Connection to firebase table============//
    const settings = { timestampsInSnapshots: true };
    afs.app.firestore().settings(settings);
    this.dataCollections = afs.collection<any>('usersInfo');
    //===================================================//
    this.registeredUsers = "";
    this.loggedIn = false;
  }

  //adds all info that was provided through the registration form to user object and ads it to the firebase DB
  public addUserToDB(user: User) {
    this.dataCollections.add(JSON.parse(JSON.stringify(user)));
  }

  //updates users info that was found by email. New data is stored in the "loggedInUser" object
  updateListing(email: string) {
    alert(email);
    this.afs.collection("usersInfo").snapshotChanges().map(actions => { //collects the DB table meta data including all table fields id and users
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
      //searches through the collectes list of user the current user to update
    }).subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.email == email) {
          this.listingDoc = this.afs.doc(`usersInfo/${doc.id}`); //takes the listing that will be updated by the doc.id (listing's id)
          this.listingDoc.update(JSON.parse(JSON.stringify(this.loggedInUser))); //finaly updates the listing
        }
      });
    });
  }
//currently a temp function that stores basic users information that is found at the FBDB.
  public getAllDBUsers() {
    this.dataCollections.valueChanges().subscribe(collection => {
      for (var i = 0; i < collection.length; i++) {
        this.registeredUsers += "   email:   " + collection[i].email + "\n   password:   " + collection[i].password + "\n   uid:   " + collection[i].uid + "   \n\n   ";
      }
    })
  }
  //returns the currently logged in user by his uid
  public getLoggedInUser() {

    this.dataCollections.valueChanges().subscribe(collection => {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i].uid === this.loggedInUserUID) {
          this.loggedInUser = collection[i];
          this.loggedIn = true;
        }
      }
    })
  }



}
