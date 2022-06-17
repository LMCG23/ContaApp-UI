import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from '../../authentication/authservice.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChecklogoutGuard implements CanActivate {
  constructor(@Inject (AuthserviceService) private authSvc:AuthserviceService,private router:Router){}

  canActivate():Observable<boolean>
  {


    return this.authSvc.isLogged.pipe(take(1),map((isLogged)=>!isLogged));

  }

}
