import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from "@angular/router";
import { User } from 'src/app/models/user';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  title:string;
  user: User;
  public token;
  public identity;
  public status: string;

  constructor(private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService) { 
    this.title= 'Identifícate';
    this.user = new User(1, 'user', '', '', '', '', '');
  }

  ngOnInit(): void {
    //console.log("Se ha cargado el login de puta madre");

    //let user = this._userService.getIdentity();
    this.logout();
    //console.log(user.name)
  }

  onSubmit(form){
    //console.log(this.user);

    this._userService.signup(this.user).subscribe(
      response => {
        // Token
        // console.log(response);
        if(response.status != 'error'){
          this.status = 'success';
          this.token = response;
          localStorage.setItem('token', this.token); // Almacenamos el token en localStorage para acceder en cualquier momento.

          // Objeto usuario identificado.
          this._userService.signup(this.user, true).subscribe(
            response => {

              this.identity = response;
              //console.log(this.token);
              //console.log(this.identity);
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity)); // Almacenamos el identity en LocalStorage.

              // Redirección.
              this._router.navigate(['/']);
              
            },
            error => {
              console.log(<any>error)
            }
          );
        }else {
          this.status = 'error';
        }

      },
      error => {
        console.log(<any>error)
      }
    );

  }

  logout(){
    this._route.params.subscribe(params => {

      let logout =+ params['sure'];

      if(logout == 1){

        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // Redirección.
        this._router.navigate(['login']);
      }
    });
  }

}
