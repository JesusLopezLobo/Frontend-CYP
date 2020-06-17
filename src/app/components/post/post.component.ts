import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Poesias } from "../../models/poesia";
import { PoesiaService } from "../../services/poesia.service";
import { Post } from "../../models/post";
import { PostService } from "../../services/post.service";
import { GLOBAL } from "../../services/global";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [UserService, PostService]
})
export class PostComponent implements OnInit {

  public identity;
  /*   show = true;
    hidden = false;
    visibility = 'visible'; */
    public url;
    public posts: Array<Post>;
  
    constructor(
      private _postService: PostService,
      private _userService: UserService
    ) 
    { 
      this.url = GLOBAL.url;
      this.identity = this._userService.getIdentity();
    }

  ngOnInit(): void {
    this.getPosts();
    
  }

  getPosts(){
    this._postService.getPosts().subscribe(
      response => {
        if(response.status == 'success'){
          this.posts = response.posts;
          console.log(this.posts);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
