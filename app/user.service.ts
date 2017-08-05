import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {User} from './user';
import {Observable} from 'rxjs/Observable';
 
@Injectable()
export class UserService{
 
    private url = "http://localhost:64269/api/users/";
    constructor(private http: Http){ }
    
    getUsers(){
        return this.http.get(this.url);
    }

    createUser(obj: User){
        const body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post(this.url, body, { headers: headers }); 
    }
    updateUser(id: number, obj: User) {
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        const body = JSON.stringify(obj);
        return this.http.put(this.url + '/' + id, body, { headers: headers });
    }
    deleteUser(id: number){
        return this.http.delete(this.url + '/' + id);
    }
}