import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router} from '@angular/router';

@Injectable()
export class AuthService 
{
  private user: Observable<firebase.User>;
  private currentUser: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth,private router: Router ) 
  {
    this.user = _firebaseAuth.authState;
  }

  signIn(email, password) 
  {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  emailSignUp(email: string, password: string) 
  {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) 
  {
    const fbAuth = firebase.auth();
    return fbAuth.sendPasswordResetEmail(email)
  }
  
  isLoggedIn() 
  {
    if (this.currentUser == null ) 
        return false;
    else 
        return true;    
  }
  
    LogOut() 
    {
      this._firebaseAuth.auth.signOut()
      .then((res) => {
      this.router.navigate(['loginScreen'])
    })
      .catch((err) => 
      console.log(err+"") 
     );
    }

}
