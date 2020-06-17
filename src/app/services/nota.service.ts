import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GLOBAL } from "./global";
import { Notas } from "../models/nota";
import { Observable } from "rxjs";

@Injectable()
export class NotaService {
    
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    pruebas(){
        return "Hola mundo!!";
    }

    create(token, nota: Notas): Observable<any>{
        let json = JSON.stringify(nota);
        let params = "json=" + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

        // Peticion Ajax.
        return this._http.post(this.url + 'notas', params, {headers: headers});
    }

    getNotas(): Observable<any>{
        //console.log("getNotas");
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'notas', {headers: headers});
    }

    delete(token, id): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.delete(this.url + 'notas/' + id, {headers: headers});
    }
}