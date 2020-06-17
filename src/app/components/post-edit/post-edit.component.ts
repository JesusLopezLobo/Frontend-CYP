import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { PostService } from "../../services/post.service";
import { CategoryService } from "../../services/category.service";
import { Post } from "../../models/post";
import { GLOBAL } from "../../services/global";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [UserService, PostService, CategoryService]
})
export class PostEditComponent implements OnInit {

  public identity;
  public token;
  public post: Post;
  public categories;
  public status;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: GLOBAL.url+"post/upload",
      headers: {
        "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube una imagen para tu relato'
  };

  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline']
  };

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _postService: PostService)
    {
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }

  ngOnInit(): void {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    //console.log(this.post);
    this.getPost();
  }

  onSubmit(form){
    console.log(form);
    console.log(this.post);
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/**', this.post.id]);
          console.log(this.post);
        }else {
          this.status = 'false';
        }
      },
      error => {
        this.status = 'false';
        console.log(error);
        this._router.navigate(['/**', this.post.id]);
      }
    );
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.status == 'success'){
          this.categories = response.categories;
          console.log(this.categories);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.post.image = image_data.image;
  }

  getPost(){

    // Sacar el id del post de la url.
    this._route.params.subscribe(params => {

      let id =+ params['id'];

      // Petición ajax para sacar los datos del post.
      this._postService.getPost(id).subscribe(
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

}
