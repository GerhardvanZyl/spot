import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _dataService: DataService) { }

  public async isAuthenticated(): Promise<Boolean> {
    let userData = localStorage.getItem('userInfo');

    if (userData && JSON.parse(userData)) {
      return true;
    }

    try {
      userData = await this._dataService.getSessionInfo().toPromise();

      if (userData) {
        this.setUserInfo(userData);
        return true;
      }
    } catch (err) {
      return false;
    }

    return false;
  }

  public setUserInfo(user) {
    console.log("userinfo:");
    console.log(user);
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

}
