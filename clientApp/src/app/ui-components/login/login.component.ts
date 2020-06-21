import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  userEmail: String;
  userPassword: String;

  constructor(private _authService: AuthService, private router:Router) { 
    console.log('constr');
  }

  ngOnInit(): void {
  }

  login(form: NgForm):void{
    debugger;
    console.log('login');
    this._authService.validate(this.userEmail, this.userPassword)
    .then((response) => {
      debugger;
      this._authService.setUserInfo({user: response['user']});
      this.router.navigate(['practices']);
    })
    .catch((e)=> {
      console.error(e)
    });
  }

}
