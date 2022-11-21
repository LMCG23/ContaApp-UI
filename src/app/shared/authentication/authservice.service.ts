import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Response } from '../models/Common/Response';
import { User } from '../models/User';

const helper = new JwtHelperService;

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  private readonly loginEndpoint = environment.webApi + 'Authentication/login'

  constructor(private http:HttpClient) {
    this.checkToken();

  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  login(user:User):Observable<Response>{
    return this.http.post<Response>(this.loginEndpoint,user).pipe(map((res:Response)=>{
      this.saveLocalStorage(res.data.token || '',res.data.accountingFirmId,res.data.userName,res.data.lastName,res.data.name);
      this.loggedIn.next(true);
      return res;
    } ), catchError((err) => this.handleError(err)))

  }

  logout():void{
    localStorage.clear();
    this.loggedIn.next(false);
  }


  private checkToken():void{
    const userToken = localStorage.getItem(environment.localStorage.token);
    if(userToken){
      const isExpired = helper.isTokenExpired(userToken || '{}')

      if(isExpired){
        this.logout()
      } else {
        this.loggedIn.next(true);
      }
    }
  }


  private saveLocalStorage(token:string,userAccountingFirm:string,userName:string,userLastName:string,name:string):void{
    localStorage.setItem(environment.localStorage.token,token);
    localStorage.setItem(environment.localStorage.userAccountingFirm,userAccountingFirm);
    localStorage.setItem(environment.localStorage.userName,userName);
    localStorage.setItem(environment.localStorage.userLastName,userLastName);
    localStorage.setItem(environment.localStorage.nameOfuser,name);
  }



  private handleError(err:any):Observable<never>{
    let errorMessge = 'An error ocurred retriving data';
      if(err){
        errorMessge = `Error: code ${err.message} `
      }
    window.alert(errorMessge);
    return throwError(errorMessge);
  }

}
