import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _authService: AuthService, private _route: Router) { }

  async canActivate() {
    
    if(await this._authService.isAuthenticated()){
      return true;
    }

    this._route.navigate(['login']);
    return false;
  }
}
