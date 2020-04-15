import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Poesias } from '../../models/poesia';
import { PoesiaService } from "../../services/poesia.service";

@Component({
  selector: 'app-poesias-new',
  templateUrl: './poesias-new.component.html',
  styleUrls: ['./poesias-new.component.css'],
  providers: [UserService, PoesiaService]
})
export class PoesiasNewComponent implements OnInit {
  title: string;
  public identity;
  public token;
  public poesia: Poesias;
  public status_poesia: string;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _poesiaService: PoesiaService) 
    { 
      this.title = "Nueva Poesía";
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }

  ngOnInit(): void {
    if(this.identity == null){
      this._router.navigate(['/login']);
    }else {
      this.poesia = new Poesias(1, '', '', '1', '',null, null);
    }
  }

  onSubmit(form){
/*     console.log(this.poesia);
    console.log(this._poesiaService.pruebas); */
    this._poesiaService.create(this.token, this.poesia).subscribe(
      response => {
        console.log(response);
        if(response.status == 'success'){
          this.status_poesia = 'success';
          this.poesia = response.poesia;
        }else {
          this.status_poesia = 'error';
        }

      },
      error => {
        this.status_poesia = 'error';
      }
    )
  }

}
