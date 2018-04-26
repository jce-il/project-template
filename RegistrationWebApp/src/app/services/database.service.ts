import { Injectable } from '@angular/core';
import { AngularFirestore } from'angularfire2/firestore';
import {User} from '../user';
@Injectable()
export class DatabaseService {

  private dataCollections;
  private allData;
  private user : User;

  constructor(private afs: AngularFirestore) 
  { 
    this.dataCollections = afs.collection<any>('usersInfo');
    this.allData = "";
  }

  public addData(user:User)
  {
    this.dataCollections.add(JSON.parse(JSON.stringify(user)));
  }

  public getData()
  {
    this.dataCollections.valueChanges().subscribe(res=>{
      for(var i = 0 ; i < res.length; i++)
      {

        this.allData += "email: "+ res[i].email+ " password:"+ res[i].password+"uid: "+res[i].uid+"\n";

       
      }
      alert(this.allData);
      this.allData="";
    })
  }



}
