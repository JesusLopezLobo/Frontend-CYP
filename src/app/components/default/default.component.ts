import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers: [UserService]
})
export class DefaultComponent implements OnInit {
  public title: string;

  constructor(private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService) {
          this.title = 'Inicio';
       }

  ngOnInit(): void {
  }

}
