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


  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  create(){
    this.userService.createUser({name: this.name, email: this.email, password: this.password})
      .subscribe(
        data => {
          this.name = ""
          this.email = ""
          this. password = ""
          console.log(data)
          this.msg = "success to create user"
        },
        error =>  this.msg = <any>error
      );
  }

}
