import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from "./services/user.service";
import { User } from './models/user';

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

  constructor(private _userService: UserService){
    
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
/*     console.log(this.identity);
    console.log(this.token); */
  }

  ngOnInit(){
    //console.log('app.component cargado')
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
