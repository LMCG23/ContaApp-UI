import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthserviceService } from '../authentication/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class CheckloginGuard implements CanActivate {

  constructor(private authSvc:AuthserviceService,private router:Router){}

  canActivate(): Observable< boolean> {

    const getLoggin = this.authSvc.isLogged.pipe(
      take(1)
    );

    const subs = getLoggin.subscribe((val:Boolean) => {if(val==true){
      this.router.navigate(['/dashboard'])}} )

    return this.authSvc.isLogged.pipe(
      take(1),
      map((isLogged: any) => (!isLogged ? true : false))
    );
  }

}
