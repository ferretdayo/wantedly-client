import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [UserService],
})
export class CreateUserComponent implements OnInit {

  msg: string
  name: string = ""
  email: string = ""
  password: string = ""

  /**
   * errorMsg
   */
  nameError: string = ""
  emailError: string = ""
  passwordError: string = ""

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  /**
   * ユーザの作成
   */
  create(){
    if(this.name === "")
      this.nameError = "Error"
    else
      this.nameError = ""
    if(this.email === "")
      this.emailError = "Error"
    else
      this.emailError = ""
    if(this.password === "")
      this.passwordError = "Error"
    else
      this.passwordError = ""
    
    if(this.nameError !== "" || this.emailError !== "" || this.passwordError !== "")
      return;
    
    this.userService.createUser({
        name: this.name,　
        email: this.email, 
        password: this.password
      })
      .subscribe(
        data => {
          console.log(data)
          this.name = ""
          this.email = ""
          this. password = ""
          this.msg = "success to create user"
        },
        error =>  this.msg = <any>error
      );
  }

}
