import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private http:HttpClient) { }

  isAuthenticated():boolean{
    if(sessionStorage.getItem('token')!==null){
      return true;
    }
    else {
      return false;
    }
  }
  canAccess(){
    if(!this.isAuthenticated()){
      this.router.navigate(['/login']);

    }
  }

  canAuthenticate(){
    if (this.isAuthenticated()) {
      //redirect to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  register(name:string,email:string,password:string){
      //send data to register api (firebase)
     return this.http
      .post<{idToken:string}>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxVf0e8nFa1cuG1N4y_2fyLA-vC8kBmzE',
          {displayName:name,email,password}
      );
  }

  storeToken(token:string){
      sessionStorage.setItem('token',token);
  }

  login(email:string,password:string){
    return this.http.post<{idToken:string}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCxVf0e8nFa1cuG1N4y_2fyLA-vC8kBmzE',{email,password}

    );
  }
  detail(){
    let token=sessionStorage.getItem('token');

    return this.http.post<{users:Array<{localId:any,displayName:string}>}>(
     ' https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCxVf0e8nFa1cuG1N4y_2fyLA-vC8kBmzE',{idToken:token}

    ) ;
   }
   removeitem(){
    sessionStorage.removeItem('token');
   }
}
