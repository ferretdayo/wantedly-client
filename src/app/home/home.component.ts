import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, SkillService]
})
export class HomeComponent implements OnInit {

  msg: string
  users: any[] = []
  loginUser: any = {}
  taggedUser: any[]
  skill: string

  constructor(
    private userService: UserService,
    private skillService: SkillService,
  ) { 
    /**
     * 全ユーザの表示
     */
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data.users
          this.loginUser = data.users[0]
          this.msg = data.user_id
          this.showSkill(this.loginUser.id);
        },
        error =>  this.msg = <any>error
      );
  }

  ngOnInit() {
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
        id: this.loginUser.id,          /* 誰に向けてのタグか */
        tag: this.skill,                /* タグの値 */
        add_userid: this.loginUser.id   /* 誰が追加したか */
      })
      .subscribe(
        data => {
          if(data.status === true){
            this.skill = ""
            this.showSkill(this.loginUser.id)
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
            this.taggedUser = this.getTagRelation(data.taggedUser)
            console.log(this.taggedUser)
          }
        },
        error =>  this.msg = <any>error
      )
  }

  /**
   * タグ名とタグを追加したユーザとタグを追加したユーザ数の取得する関数
   * 
   * @param taggedUser
   * @return array タグ名、そのユーザとユーザ数を含む配列
   */
  private getTagRelation(taggedUser: any[]){
    let tags = []
    for(let key in taggedUser){
      let tag = {'name': key, 'tagged': taggedUser[key], 'cnt': taggedUser[key].length}
      tags.push(tag)
    }
    tags.sort((a: any, b: any) => {
      if(a.cnt > b.cnt) return -1;
      if(a.cnt < b.cnt) return 1;
      return 0;
    });
    return tags
  }

  detail(user_id: string){
    console.log(user_id);
  }
}
