import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { Category } from "../../models/category";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {

  public identity;
  public token; 
  public category: Category;
  public status: string;
  public categories;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, '');
  }

  ngOnInit(): void {
    this.getCategories();
  }

  onSubmit(form){
    console.log(this.category);
    console.log(this.token);
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if(response.status == 'success'){
          
          this.category = response.category;
          this.status = 'success';

        }else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.status == 'success'){
          this.categories = response.categories;
          //console.log(this.categories);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteCategory(id){
    //console.log("deletePoesias");
    this._categoryService.delete(this.token, id).subscribe(
      response => {
        //console.log("response delete poesias")
        this.getCategories();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
