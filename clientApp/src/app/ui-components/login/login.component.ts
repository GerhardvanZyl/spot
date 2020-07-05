import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  userEmail: String;
  userPassword: String;

  constructor(private _authService: AuthService, private router:Router) { 
    //console.log('constr');

    window.location.href = `${environment.apiUrl}/authentication/login`;
  }

  ngOnInit(): void {
  }

  // login(form: NgForm):void{
  //   console.log('login');
  //   this._authService.validate(this.userEmail, this.userPassword)
  //   .then((response) => {
  //     this._authService.setUserInfo({user: response['user']});
  //     this.router.navigate(['practices']);
  //   })
  //   .catch((e)=> {
  //     console.error(e)
  //   });
  // }

}
