import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  error: boolean = false

  constructor(
    private userService: UserService,
    private skillService: SkillService,
    private router: Router
  ) { 
    /**
     * 全ユーザの表示
     */
    this.userService.getUsers()
      .subscribe(
        data => {
          if(data.status === true){
            this.users = data.users
            this.loginUser = data.current_user
            this.msg = data.user_id
            this.showSkill(this.loginUser.id);
          } else {
            if(data.msg == "please login"){
              this.router.navigate(['']);
            }
          }
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
    if(this.skill == "")
      return false;
    console.log(this.skill)
    // スキルのタグの追加
    this.skillService.addSkillTag({
        id: this.loginUser.id,          /* 誰に向けてのタグか */
        tag: this.skill,                /* タグの値 */
      })
      .subscribe(
        data => {
          if(data.status === true){
            this.skill = ""
            this.showSkill(this.loginUser.id)
          } else {
            if(data.msg == "please login"){
              this.router.navigate(['']);
            }
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
            this.error = false
          } else {
            if(data.msg == "please login"){
              this.router.navigate(['']);
            }
          }
        },
        error =>  {
          this.msg = <any>error
          this.error = true
        }
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
      let isTagged = true;
      for(let i = 0; i < taggedUser[key].length; i++){
        if(taggedUser[key][i].id == this.loginUser.id){
          isTagged = false;
        }
      }
      let tag = {'name': key, 'tagged': taggedUser[key], 'cnt': taggedUser[key].length, 'isTagged': isTagged}
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
