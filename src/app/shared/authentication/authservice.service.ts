import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { UserResponse } from '../models/userResponse';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

const helper = new JwtHelperService;

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

private readonly loginEndpoint = environment.webApi + 'Authorization/login'

  private loggedIn = new BehaviorSubject<boolean>(false);

   isloggedIn:boolean = false

  get isLogged():Observable<boolean>{
      return this.loggedIn.asObservable();
  }


  constructor(private http:HttpClient) {
    this.checkToken();
  }

  /**
   *  this method call to the API to authenticate the user
   * @returns Observable<UserResponse> the user with the autentication
   *
   */
    login(authData:User):Observable<UserResponse | void>{
      return this.http.post<UserResponse>(this.loginEndpoint,authData).pipe(map((res:UserResponse)=>{
        this.saveToken(res.token);
        this.loggedIn.next(true);
        this.isloggedIn = true;
        return res;
      }), catchError((err)=>this.handleError(err))
      )
    }



   /**
   *  this method do the logout of the app
   *
   *
   */
    logout():void{
      localStorage.removeItem('token');
      this.loggedIn.next(false);
      this.isloggedIn = false;
    }

     /**
     *  this method is in charge of read the token that we get from the API
     *
     *
     */
    private checkToken():void{
      const userToken = localStorage.getItem('token')?.toString();
      const isExpired =  helper.isTokenExpired(userToken);
      if(!isExpired){
        this.logout();
      } else {
        this.loggedIn.next(true);
      }
    }

   /**
   *  this method is in charge of save the token that we get from the API in the localStorage
   *
   *
   */
  private saveToken(token:string):void {
    localStorage.setItem('token',token)
  }

  /**
   *  this method is in charge of handle the errors
   *
   */
  private handleError(err:any):Observable<never>{
    let errorMessage = 'Ha sucedido un error al recuperar la informacion';
    if(err){
      errorMessage = `Error code: ${err.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
