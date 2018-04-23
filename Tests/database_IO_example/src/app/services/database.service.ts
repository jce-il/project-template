import { Injectable } from '@angular/core';
import { AngularFirestore } from'angularfire2/firestore'

@Injectable()
export class DatabaseService {

  private dataCollections;
  private data;
  private allData;

  constructor(private afs: AngularFirestore) 
  { 
    this.dataCollections = afs.collection<any>('usersInfo');
    this.data = {name:"moran",lastName:"zargari"};
    this.allData = "";
  }

  public addData()
  {
    this.dataCollections.add(this.data);
  }

  public getData()
  {
    this.dataCollections.valueChanges().subscribe(res=>{
      for(var i = 0 ; i < res.length; i++)
      {
        this.allData += res[i].name + " " + res[i].lastName + "\n";
      }
      alert(this.allData);
    })
  }



}
