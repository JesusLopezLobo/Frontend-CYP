import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Post } from '../../models/post';
import { PostService } from "../../services/post.service";
import { GLOBAL } from "../../services/global";
import { UserService } from '../../services/user.service';
import { Comment } from "../../models/comment";
import { User } from "../../models/user";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {

  public token;
  public identity;
  public url;
  public post: Post;
  public comment: Comment;
  public post_id;
  public comments: Array<Comment>; 
  public users: Array<User>;
  public froala_options: Object = {
    events : {
      'initialized': (editor) => {
        editor._editor.edit.off();
      }
    },
    charCounterCount : false,
    contenteditable: false,
    toolbarButtons: [],
  }

  constructor(private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService) 
    {
      this.url = GLOBAL.url;
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken(); 
    }

  ngOnInit(): void {
    
    this.getPost();
    this.getComments();
    this.getUser();
    this.comment = new Comment(1, this.identity.sub || this.identity.id, this.post_id ,'', null);
    //console.log(this.identity);
  }

  getPost(){
    // Sacar el id del post de la url.
    this._route.params.subscribe(params => {

      this.post_id =+ params['id'];

      // Petición ajax para sacar los datos del post.
      this._postService.getPost(this.post_id).subscribe(
        response => {
          if(response.status == 'success'){
            this.post = response.posts;
            //console.log(this.post);
          }
        },
        error => {
          this._router.navigate(['/inicio']);
          console.log(error);
        }
      );

    });

  }

  getUser(){
    this._userService.getUser().subscribe(
      response => {
        console.log(response);
        
        this.users = response.user;
        console.log(this.users);
        console.log("estoy aqui");
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form){
    //console.log(this.comment);
    //console.log(form);
    this._postService.createComment(this.token, this.comment).subscribe(
      response => {

          this.comment = response.comment;
          console.log(response);
          window.location.reload();

      },
      error => {
        console.log(error);
      }
    );
  }

  getComments(){
    this._postService.getComment().subscribe(
      response => {
        console.log(response);
        if(response.status == 'success'){
          //console.log(this.identity.sub);
          console.log(response);
          this.comments = response.comment;
        }
        
      },
      error => {
        console.log(error);
      }
    );
  }
}
