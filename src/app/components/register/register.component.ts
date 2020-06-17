import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from "@angular/router";
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  title: string;
  user: User;
  status: string;

  constructor(private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService) { 

    this.title = 'Regístrate';
    this.user = new User(1, 'user', '', '', '', '', 'defecto.jpeg');

  }

  ngOnInit(): void {
  }

  onSubmit(form){
/*     console.log(this.user);
    console.log(this._userService.pruebas); */

    this._userService.register(this.user).subscribe(
        response => {

          if(response.status == 'success'){
            this.status = response.status;
            // Vaciar el formulario
            form.reset();
            this._router.navigate(['/']);
          }else {
            this.status = 'error';
            //this._router.navigate(['/']);
          }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
