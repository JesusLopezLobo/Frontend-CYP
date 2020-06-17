import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Poesias } from "../../models/poesia";
import { PoesiaService } from "../../services/poesia.service";
import { Post } from "../../models/post";
import { PostService } from "../../services/post.service";
import { GLOBAL } from "../../services/global";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [UserService, PostService]
})
export class InicioComponent implements OnInit {

  public identity;
  public token;
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
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
/*     if(this.identity == null){
      this._router.navigate(['/login']);
    } */
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

/*   poesiaShow(){
    this.show = !this.show;
  }

  relatosShow(){
    this.hidden = !this.hidden;

  }

  cortosShow(){
    this.visibility = this.visibility == 'visible' ? 'hidden' : 'visible';
  } */

  deletePost(id){
    if(confirm("¿Estas seguro que me quieres borrar?")){
      this._postService.delete(this.token, id).subscribe(
        response => {
          this.getPosts();
        },
        error => {
          console.log(error);
        }
      );
    }

  }



}
