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
  selectedUser = []; //holds an array with selected users. used by the getUser() function
  existsUsers = []; // holds the project partners - to see if they exist on the server 
  public loggedIn: string; //check if this is the right way to do
  listingDoc: AngularFirestoreDocument<User>; //holds FB listing for update operation
  observableUsers: Observable<User[]>; //A temp variable that returns metadata. used by usersList
  usersList = []; // holds a list with listing id's and users info of the UsersInfo table

  /* project*/
  public projectCollections; // holds a connection the firebase ProjectsInfo table
  public project: Project; // Holds project info that were inserted in the form by the user
  listingProjectDoc: AngularFirestoreDocument<Project>; //holds FB listing for update operation
  observableProjects: Observable<Project[]>; //A temp variable that returns metadata. used by projectsList
  projectsList = []; // holds a list with listing id's and projects info of the ProjectInfo table


  constructor(private afs: AngularFirestore) {
    //==========Connection to firebase table============//
    const settings = { timestampsInSnapshots: true };
    afs.app.firestore().settings(settings);
    this.dataCollections = afs.collection<any>('usersInfo');
    this.loggedIn = 'false'; //represents if user is logged in. has to be STRING !!!
    this.projectCollections = afs.collection<any>('projectsInfo');
    //===================================================//
    this.existsUsers = [false, false, false];
  }

  //adds all info that was provided through the registration form to user object and ads it to the firebase DB
  public addUserToDB(user: User) {
    this.dataCollections.add(JSON.parse(JSON.stringify(user)));
  }

  //adds all info that was provided through the project-upload form to project object and ads it to the firebase DB
  public addProjectToDB(project: Project) {
    this.projectCollections.add(JSON.parse(JSON.stringify(project)));
  }

  //Update a UsersInfo listing by a given email. the object that is passed to the update function has to be already with the wanted changes!!! (It writes a new object)
  updateListing(email: string) {
    for (var i = 0; i < this.usersList.length; i++) {
      if (this.usersList[i].email == email) {
        this.listingDoc = this.dataCollections.doc(`${this.usersList[i].id}`); //takes the listing that will be updated by the doc.id (listing's id)
        this.listingDoc.update(JSON.parse(JSON.stringify(this.user)));
      }
    }
  }
//project name should be unique !!!!!!!
  updateProjectListing(project_name: string) {
    for (var i = 0; i < this.projectsList.length; i++) {
      if (this.projectsList[i].project_name == project_name) {
        this.listingDoc = this.projectCollections.doc(`${this.projectsList[i].id}`); //takes the listing that will be updated by the doc.id (listing's id)
        this.listingDoc.update(JSON.parse(JSON.stringify(this.project)));
      }
    }
  }

  /* the function finds the listing to update by email, and then,
   updates it's data by selecting the user from selected user
    by the given user index.
    Index is needed to choose from the selectedUser array*/
  asignProjectToUser(email: string, userIndex) {
    for (var i = 0; i < this.usersList.length; i++) {
      if (this.usersList[i].email == email) {
        this.listingDoc = this.dataCollections.doc(`${this.usersList[i].id}`); //takes the listing that will be updated by the doc.id (listing's id)
        this.listingDoc.update(JSON.parse(JSON.stringify(this.selectedUser[userIndex])));// 
      }
    }
  }

  //This is a help function to setMetaData() it retrives usersInfo table including listing IDs.
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
  }

  getProjectMetaData() { //Returns the DB table meta data from firebase including all table fields id and users
    this.observableProjects = this.projectCollections.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
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
  //returns the currently logged in user by his uid and sets the value in loggedInUser property.
  //in order to use this function - the value of loggedIn has to be true. user cookies if needed
  public getLoggedInUser() {
    return new Promise((resolve, reject) => {
      this.dataCollections.valueChanges().subscribe(collection => {
        for (var i = 0; i < collection.length; i++) {
          if (collection[i].uid === this.loggedInUserUID) {
            this.loggedInUser = collection[i];
            resolve();
            return;
          }
        }
        resolve();
      })
    });
  }
//This function sets in the 'selectedUser' array (first 3 cells) property users that were found by a given email.
  public getUser(email1: string, email2: string, email3: string) { // get user asiggned to project
    return new Promise((resolve, reject) => {
      this.dataCollections.valueChanges().subscribe(collection => {

        for (var i = 0; i < collection.length; i++) { //find participantes email's and puts them in array
          if (collection[i].email === email1) {
            this.selectedUser[0] = collection[i];
            this.existsUsers[0] = true;
          }
          else if (collection[i].email === email2) {
            this.selectedUser[1] = collection[i];
            this.existsUsers[1] = true;
          }
          else if (collection[i].email === email3) {
            this.selectedUser[2] = collection[i];
            this.existsUsers[2] = true;
          }
        }
        resolve();
      })
    });
  }
// returns the id listing of project by a given project name
  public getProjectID(pname: string) { //get project ID by Project name
    for (var i = 0; i < this.projectsList.length; i++) {
      if (this.projectsList[i].project_name == pname) {
        return this.projectsList[i].id;
      }
    }
    return 'not found';
  }
}
