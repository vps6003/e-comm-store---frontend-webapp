import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginForm } from '../../types/login';
import { RegisterForm } from '../../types/register';


@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  constructor(private http : HttpClient){}

    newUserRegistration(obj:RegisterForm){
     return this.http.post<RegisterForm>(environment.authRegisterApiUrl,obj);
    }

    userLogin(obj:LoginForm){
     return this.http.post<LoginForm>(environment.authLoginApiUrl,obj);
    }

    verifyTokenService(){
      return this.http.get(environment.authVerifyToken);
    }

    get isLoggedIn (){
      let token = localStorage.getItem('token');
      return token ? true : false;
    }

    get userName(){
      let userData = localStorage.getItem('user');
      if(userData){
        return JSON.parse(userData).name;
      }
      else
        return null;

    }

    get isAdminCheck (){
      let userData = localStorage.getItem('user');
      if(userData){
        return JSON.parse(userData).isAdmin;
      }
      return false;
    }



}
