import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  createUser(model:any){
    return this.http.post('http://localhost:3000/user' , model)
  }

  getUsers(){
    return this.http.get('http://localhost:3000/user')

  }
}
