import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from '../../authentication/authservice.service';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckIsLoggedGuard implements CanActivate {

  constructor(
    private authSvc:AuthserviceService,private router:Router
    ) {}


  canActivate(): Observable< boolean> {
    const getLoggin = this.authSvc.isLogged.pipe(
      take(1)
    );

    const subs = getLoggin.subscribe((val:Boolean) => {if(val==false){
      this.router.navigate(['/login-page'])}} )

    return this.authSvc.isLogged.pipe(
      take(1),
      map((isLogged: any) => (!isLogged ? false : true))
    );

  }

}
