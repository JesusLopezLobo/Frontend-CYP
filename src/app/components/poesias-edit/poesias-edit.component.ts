import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Poesias } from '../../models/poesia';
import { PoesiaService } from "../../services/poesia.service";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-poesias-edit',
  templateUrl: './poesias-edit.component.html',
  styleUrls: ['./poesias-edit.component.css'],
  providers: [UserService, PoesiaService]
})
export class PoesiasEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
