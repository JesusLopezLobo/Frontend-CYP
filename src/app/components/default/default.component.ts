import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Poesias } from '../../models/poesia';
import { PoesiaService } from "../../services/poesia.service";
import { NotaService } from "../../services/nota.service";
import { Notas } from "../../models/nota";
import { NgForm } from '@angular/forms';
import { GLOBAL } from "../../services/global";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers: [UserService, PoesiaService, NotaService]
})
export class DefaultComponent implements OnInit {
  public title: string;
  public poesias: Array<Poesias>;
  //public identity = JSON.parse(localStorage.getItem('identity')); // Cogemos la identidad de la persona para mostrar sus post.
  public token; 
  public identity;
  public nota: Notas;
  public notas: Array<Notas>;
  public status_nota;
  public url;

  @ViewChild('botonCerrar') botonCerrar: ElementRef;

  @ViewChild('notasForm') notasForm: NgForm;

  constructor(private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _poesiaService: PoesiaService,
      private _notaService: NotaService) 
      {
        this.title = 'Inicio';
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.url = GLOBAL.url;
      }

  ngOnInit(): void {
    if(this.identity == null){
      this._router.navigate(['/login']);
    }else {
      this.getPoesia();
      this.nota = new Notas(1, '', '', '1', null, null);
      this.getNotas();
    }

  }

  // POESIAS. Mostrar y borrar.

  getPoesia(){
    this._poesiaService.getPoesias().subscribe(
      response => {
        //console.log(response);
        if(response.status == 'success'){
          //console.log(this.identity.sub);
          this.poesias = response.poesias;
        }
        
      },
      error => {
        console.log(error);
      }
    );
  }

  deletePoesias(id){
    //console.log("deletePoesias");
    this._poesiaService.delete(this.token, id).subscribe(
      response => {
        //console.log("response delete poesias")
        this.getPoesia();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  // NOTAS.

  onAgregarNota(form){
    /* console.log(this.nota);
    console.log(this._notaService.pruebas()); */
    this._notaService.create(this.token, this.nota).subscribe(
      response => {
        if(response.status == 'success') {
          //console.log(response);
          this.nota = response.nota;
          this.status_nota = 'success';
          this.notasForm.resetForm();
          this.cerrarModal();
          this.getNotas();
        }else {
          this.status_nota = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status_nota = 'error';
      }
    );
  }

  getNotas(){
    this._notaService.getNotas().subscribe(
      response => {
        //console.log(response);
        if(response.status == 'success'){
          //console.log(this.identity.sub);
          console.log(response);
          this.notas = response.notas;
        }
        
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteNotas(id){
    this._notaService.delete(this.token, id).subscribe(
      response => {
        this.getNotas();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }



}
