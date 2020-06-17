import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from "../../services/user.service";
import { GLOBAL } from '../../services/global'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public user: User;
  public identity;
  public token;
  public status_User;
  public url;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: GLOBAL.url+"user/upload",
      headers: {
        "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Cambia tu foto de perfil'
  };

  constructor(private _userService: UserService) 
  {
    this.user = new User(1, 'user', '', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

    // Rellenar el objeto usuario, extraido de la base de datos para su identificación.
    this.user = new User(this.identity.sub, this.identity.role, this.identity.name, this.identity.surname, this.identity.email, '', this.identity.image);
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if(response.status == 'success'){

          this.status_User = 'success';

          // Actualizar usuario en sesión
          if(response.changes.sub){
            this.user.id = response.changes.sub;
          }

          if(response.changes.name){
            this.user.name = response.changes.name;
          }

          if(response.changes.surname){
            this.user.surname = response.changes.surname;
          }

          if(response.changes.email){
            this.user.email = response.changes.email;
          }

          if(response.changes.image){
            this.user.image = response.changes.image;
          }

          this.identity = this.user;
          console.log(this.identity);
          localStorage.setItem('identity', JSON.stringify(this.identity));

        }else{
          this.status_User = 'error';
        }

      },
      error => {

        this.status_User = 'error';
        console.log(<any>error);
      }
    )
  }

  avatarUpload(datos){
    let data = JSON.parse(datos.response);
    this.user.image = data.image;
  }

}
