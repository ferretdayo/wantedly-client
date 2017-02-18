import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  msg: string;
  users: any[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    /**
     * 全ユーザの表示
     */
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data.users
          this.msg = data.user_id
        },
        error =>  this.msg = <any>error
      );
  }

  

}