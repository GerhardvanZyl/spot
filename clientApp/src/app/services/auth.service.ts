import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _dataService: DataService) { }

  public isAuthenticated():Boolean {
    let userData = localStorage.getItem('userInfo');

    if(userData && JSON.parse(userData)){
      return true;
    }

    return false;
  }

  public setUserInfo(user){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public validate(email, password){
    return this._dataService.login(email, password).toPromise();
  }
}
