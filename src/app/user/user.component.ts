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
  taggedUser: any[]
  skill: string
  error: boolean = false

  constructor(
    private userService: UserService,
    private skillService: SkillService,
    private route: ActivatedRoute,
    private router: Router
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
          this.loginUser = data.current_user
          this.msg = data.user_id
        },
        error =>  this.msg = <any>error
      );
    /**
     * pathのparamの選択されたユーザIDからその人のスキルを表示
     */
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.showSkill(id);
    });
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
        id: this.user.id,          /* 誰に向けてのタグか */
        tag: this.skill,                /* タグの値 */
      })
      .subscribe(
        data => {
          if(data.status === true){
            this.skill = ""
            console.log("success to add skillTag");
            this.showSkill(this.user.id)
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
   * ログインしたユーザのタグ情報とユーザ情報を取得
   */
  showSkill(user_id: number){
    this.skillService.getUserSkill(user_id)
      .subscribe(
        data => {
          if(data.status === true){
            this.user = data.user
            this.taggedUser = this.getTagRelation(data.taggedUser)
            console.log(this.taggedUser)
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
   * 指定のタグに+1し、人数を追加する
   */
  addUserByTag(tag: string){
    this.skillService.addUserByTag(
      tag,
      {
        user_id: this.user.id,
        add_userid: this.loginUser.id
      }
    ).subscribe(
        data => {
          if(data.status === true){
            console.log(this.taggedUser)
            this.showSkill(this.user.id)
            this.error = false
          } else {
            if(data.msg == "please login"){
              this.router.navigate(['']);
            }
          }
        },
        error =>  {
          this.msg = <any>error
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
}
