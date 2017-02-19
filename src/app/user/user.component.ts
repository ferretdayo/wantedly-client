import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, SkillService]
})
export class UserComponent implements OnInit {

  msg: string
  users: any[] = []
  loginUser: any = {}
  user: any = {}
  userTags: any[]
  skill: string
  error: boolean = false

  constructor(
    private userService: UserService,
    private skillService: SkillService,
    private router: ActivatedRoute
  ) { 
  }

  ngOnInit() {
    /**
     * 全ユーザの表示
     */
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data.users
          this.loginUser = data.users[0]
          this.msg = data.user_id
        },
        error =>  this.msg = <any>error
      );
    /**
     * pathのparamの選択されたユーザIDからその人のスキルを表示
     */
    this.router.params.subscribe(params => {
      let id = params['id'];
      this.showSkill(id);
    });
  }

  /**
   * タグの追加
   */
  addTag(){
    // 入力がない場合
    if(this.skill === "")
      return;
    console.log(this.skill)
    // スキルのタグの追加
    this.skillService.addSkillTag({
        id: this.user.id,          /* 誰に向けてのタグか */
        tag: this.skill,                /* タグの値 */
        add_userid: this.loginUser.id   /* 誰が追加したか */
      })
      .subscribe(
        data => {
          if(data.status === true){
            this.skill = ""
            console.log("success to add skillTag");
          }
        },
        error =>  this.msg = <any>error
      )
  }

  /**
   * ログインしたユーザのタグ情報を取得
   */
  showSkill(user_id: number){
    this.skillService.getUserSkill(user_id)
      .subscribe(
        data => {
          if(data.status === true){
            this.userTags = data.tag
            this.user = data.user
            this.error = false
          }else{
          }
        },
        error =>  {
          this.msg = <any>error
          this.error = true
        }
      )
  }

}
