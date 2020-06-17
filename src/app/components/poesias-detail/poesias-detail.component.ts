import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Poesias } from '../../models/poesia';
import { PoesiaService } from "../../services/poesia.service";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-poesias-detail',
  templateUrl: './poesias-detail.component.html',
  styleUrls: ['./poesias-detail.component.css'],
  providers: [PoesiaService, UserService]
})
export class PoesiasDetailComponent implements OnInit {
  public poesia: Poesias;
  public token;
  public status_poesia;

  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
  };


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _poesiaService: PoesiaService) 
    { 
      this.token = this._userService.getToken();
    }

  ngOnInit(): void {  
    this._route.params.subscribe( params => {
      let id =+ params['id'];
      this.getPoesia(id);
    });
  }

  getPoesia(id){
      this._poesiaService.getPoesia(id).subscribe(
        response => {
          console.log(response);
          if(response.status == 'success'){
            
            this.poesia = response.poesias;
            
          }else{
            console.log("holaa");
            this._router.navigate(['personal']);
          }
        },
        error => {
           console.log(<any>error);
        }
      );
  }

  onSubmit(form){
    console.log(form);
    // Servicio.
    //console.log(this.poesia.id);
    this._poesiaService.update(this.token, this.poesia, this.poesia.id).subscribe(
      response => {
        if(response.status == 'success'){
          //console.log(this.poesia);
          this.status_poesia = 'success';
        }else {
          this.status_poesia = 'error'
        }
      },
      error => {
        this.status_poesia = 'error'
        console.log(<any>error);
      }
    )
  }

}
