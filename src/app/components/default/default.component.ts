import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Poesias } from '../../models/poesia';
import { PoesiaService } from "../../services/poesia.service";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers: [UserService, PoesiaService]
})
export class DefaultComponent implements OnInit {
  public title: string;
  public poesias: Array<Poesias>;
  public identity = JSON.parse(localStorage.getItem('identity')); // Cogemos la identidad de la persona para mostrar sus post.
  public token; 

  constructor(private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _poesiaService: PoesiaService) 
      {
        this.title = 'Inicio';
        this.token = this._userService.getToken();
      }

  ngOnInit(): void {
    this.getPoesia();
  }

  getPoesia(){
    this._poesiaService.getPoesias().subscribe(
      response => {
        //console.log(response);
        if(response.status == 'success'){
          //console.log(this.identity.sub);
          this.poesias = response.poesias;
        }
        
      },
      error => {
        console.log(error);
      }
    );
  }

  deletePoesias(id){
    //console.log("deletePoesias");
    this._poesiaService.delete(this.token, id).subscribe(
      response => {
        //console.log("response delete poesias")
        this.getPoesia();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
