import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { root } from "rxjs/internal-compatibility";

@Injectable({
  providedIn:'root',
})
export class LoggedInGuard implements CanActivate{

  constructor(private router:Router){}

  canActivate(): boolean {

      if(localStorage.getItem('token')!==null){
          return true;
      }

      this.router.navigate(['/login-page'])


      return false;
  }


}
