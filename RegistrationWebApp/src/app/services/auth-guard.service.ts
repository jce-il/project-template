import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthGuardService {// this service handle rout security.

  constructor(private cookieService: CookieService, private router: Router, private auth: AuthService) { }

  canActivate() { //returns true, the user can activate the route. When canActivate returns false, the user cannot access the route.
    if (this.cookieService.get('User login status') != 'true')
    {
      this.router.navigate(['loginScreen']);
      return false;
    }
    return true;
  }
}
