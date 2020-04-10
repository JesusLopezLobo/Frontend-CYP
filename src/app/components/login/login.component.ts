import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title:string;

  constructor(private _route: ActivatedRoute,
      private _router: Router) { 
    this.title= 'Identificate';
  }

  ngOnInit(): void {
    console.log("Se ha cargado el login de puta madre");
  }

}
