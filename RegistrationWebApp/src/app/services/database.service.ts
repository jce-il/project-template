import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { Project } from '../project';


@Injectable()
export class DatabaseService {

  public dataCollections; //will hold the DB collection table that is stored in the firebase
  public registeredUsers; //a string that holds information that was collected from getAllDBUsers() function
  public user: User; //will hold the data that was collected from a user that wants to register to the website
  public loggedInUserUID: string; //only holds logged in users id
  public loggedInUser: User; // holds logged in user info 
  selectedUser = [];
  public loggedIn: string; //check if this is the right way to do
  listingDoc: AngularFirestoreDocument<User>; //holds FB listing for update operation
  observableUsers: Observable<User[]>;
  usersList = [];

  /* project*/
  public projectCollections;
  public project: Project;
  listingProjectDoc: AngularFirestoreDocument<Project>; //holds FB listing for update operation
  observableProjects: Observable<Project[]>; //
  projectsList = [];


  constructor(private afs: AngularFirestore) {
    //==========Connection to firebase table============//
    const settings = { timestampsInSnapshots: true };
    afs.app.firestore().settings(settings);
    this.dataCollections = afs.collection<any>('usersInfo');
    this.loggedIn = 'false';
    //===================================================//
    this.projectCollections = afs.collection<any>('projectsInfo');
  }

  //adds all info that was provided through the registration form to user object and ads it to the firebase DB
  public addUserToDB(user: User) {
    this.dataCollections.add(JSON.parse(JSON.stringify(user)));
  }

  //adds all info that was provided through the project-upload form to project object and ads it to the firebase DB
  public addProjectToDB(project: Project) {
    this.projectCollections.add(JSON.parse(JSON.stringify(project)));
  }

  //updates users info that was found by email. New data is stored in the "loggedInUser" object
  updateListing(email: string) {
    for (var i = 0; i < this.usersList.length; i++) {
      if (this.usersList[i].email == email) {
        this.listingDoc = this.dataCollections.doc(`${this.usersList[i].id}`); //takes the listing that will be updated by the doc.id (listing's id)
        this.listingDoc.update(JSON.parse(JSON.stringify(this.user)));
      }
    }
  }

  asignProjectToUser(email: string, userIndex) {
    for (var i = 0; i < this.usersList.length; i++) {
      if (this.usersList[i].email == email) {
        this.listingDoc = this.dataCollections.doc(`${this.usersList[i].id}`); //takes the listing that will be updated by the doc.id (listing's id)
        this.listingDoc.update(JSON.parse(JSON.stringify(this.selectedUser[userIndex])));
      }
    }
  }

  //recive user list with document ids from firebase
  getMetaData() {
    this.observableUsers = this.dataCollections.snapshotChanges().map(actions => { //collects the DB table meta data including all table fields id and users
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })

    return this.observableUsers;
  }
  //after reciving the metadata from firebase - set it to the userslist variable
  setMetaData() {
    this.getMetaData().subscribe(res => {
      this.usersList = res;
    });

    this.getProjectMetaData().subscribe(res => {
      this.projectsList = res;
    });
  }

  getProjectMetaData() {
    this.observableProjects = this.projectCollections.snapshotChanges().map(actions => { //collects the DB table meta data including all table fields id and users
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })

    return this.observableProjects;
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
        }
      }
    })
  }

  public getUser(email1 : string, email2 : string) {
    this.dataCollections.valueChanges().subscribe(collection => {
      
      for (var i = 0; i < collection.length; i++) 
      {
        if (collection[i].email === email1) {
          this.selectedUser[0] = collection[i];
        }
        else if (collection[i].email === email2) {
          this.selectedUser[1] = collection[i];
        }
      }
    })
  }

  public getProjectID(pname : string)
  {
    for(var i = 0 ; i < this.projectsList.length ; i++)
    {
      if(this.projectsList[i].project_name == pname)
      {
        return this.projectsList[i].id;
      }
    }
    return 'not found';
  }
}
