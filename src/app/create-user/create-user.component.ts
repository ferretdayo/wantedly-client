import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [UserService],
})
export class CreateUserComponent implements OnInit {

  errorMessage: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  create(){
    this.userService.createUser()
      .subscribe(
        data => console.log(data),
        error =>  this.errorMessage = <any>error
      );
  }

}
