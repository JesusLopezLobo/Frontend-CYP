import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GLOBAL } from "./global";
import { Poesias } from "../models/poesia";
import { Observable } from "rxjs";

@Injectable()
export class PoesiaService {
    
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    pruebas(){
        return "Hola mundo!!";
    }

    create(token, poesia: Poesias): Observable<any>{
        // Limpiar campo content.
        poesia.image = GLOBAL.htmlEntities(poesia.image);

        let json = JSON.stringify(poesia);
        let params = "json=" + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

        // Peticion Ajax.
        return this._http.post(this.url + 'poesias', params, {headers: headers});
    }

    getPoesias(): Observable<any>{
        //console.log("getPoesias");
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'poesias', {headers: headers});
    }

    getPoesia(id): Observable<any>{ // Solo uno.
        return this._http.get(this.url + 'poesias/' + id);
    }

    update(token, poesia, id): Observable<any>{
        // Limpiar campo content.
        poesia.image = GLOBAL.htmlEntities(poesia.image);

        //console.log("guardar");
        let json = JSON.stringify(poesia);
        let params = "json=" + json;
    
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.put(this.url + 'poesias/' + id, params, {headers: headers});
    }

    delete(token, id): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.delete(this.url + 'poesias/' + id, {headers: headers});
    }
    
}
