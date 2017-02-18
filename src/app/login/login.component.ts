import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  msg: string
  email: string
  password: string

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  login(){
    this.userService.loginUser({
        email: this.email, 
        password: this.password
      })
      .subscribe(
        data => {
          this.email = ""
          this. password = ""
          this.msg = "success to create user"
        },
        error =>  this.msg = <any>error
      );
  }

}
