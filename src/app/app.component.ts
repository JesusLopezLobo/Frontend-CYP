import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from "./services/user.service";
import { User } from './models/user';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent implements OnInit, DoCheck{
  title = 'client-angular';
  public identity;
  public token;
  public url;
  // public identityRole = this.identity.role;


  constructor(private _userService: UserService){
    
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
/*     console.log(this.identity);
    console.log(this.token); */
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    //console.log('app.component cargado')
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

/*   isAdmin():boolean{
    console.log(this.identity.role);
    if(this.identity.sub == '2' || this.identity.id == '2'){
      return true;
    }else {
      return false;
    }
  } */
}
