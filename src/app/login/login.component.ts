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

  emailError: string
  passwordError: string

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  /**
   * login処理
   */
  login(){
    if(this.email === "")
      this.emailError = "Error"
    else
      this.emailError = ""
    if(this.password === "")
      this.passwordError = "Error"
    else
      this.passwordError = ""
    
    if(this.emailError !== "" || this.passwordError !== "")
      return;

    this.userService.loginUser({
        email: this.email, 
        password: this.password
      })
      .subscribe(
        data => {
          this.email = ""
          this.password = ""
          this.msg = data.msg
        },
        error =>  this.msg = <any>error
      );
  }

}
