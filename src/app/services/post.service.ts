import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GLOBAL } from "./global";
import { Post } from "../models/post";
import { Comment } from "../models/comment";
import { Observable } from "rxjs";

@Injectable()
export class PostService {
    
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    create(token, post): Observable<any>{

        // Limpiar campo content.
        post.content = GLOBAL.htmlEntities(post.content);

        let json = JSON.stringify(post);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        
        return this._http.post(this.url + 'post', params, {headers: headers})
    }

    getPosts(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'post', {headers: headers});
    }

    getPost(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'post/' + id, {headers: headers});
    }

    update(token, post, id): Observable<any> {
        // Limpiar campo content.
        post.content = GLOBAL.htmlEntities(post.content);

        let json = JSON.stringify(post);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.put(this.url + 'post/' + id, params, {headers: headers});
    }

    delete(token, id){
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.delete(this.url + 'post/' + id, {headers: headers})
    }

    getComment(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'comment', {headers: headers});
    }

    createComment(token, comment): Observable<any>{

        let json = JSON.stringify(comment);
        let params = "json="+json;

        console.log("estoy aqui");
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        
        return this._http.post(this.url + 'comment', params, {headers: headers})
    }

}